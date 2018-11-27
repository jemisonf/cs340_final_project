import secrets
from datetime import datetime

import pymysql.cursors
from flask import Flask, render_template, request, g, Response, jsonify
from flask.json import JSONEncoder
from marshmallow import ValidationError
from flask_cors import CORS

from core.comment import CommentSchema
from core.follow import FollowSchema
from core.message import MessageSchema
from core.user import UserSchema


# Override JSONEncoder's date formatting to keep the format consistent
class MyJSONEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat(' ')
        return super().default(o)


class MyFlask(Flask):
    json_encoder = MyJSONEncoder


app = MyFlask(__name__)
app.config.from_pyfile("configuration.py")
CORS(app)
tokens = {}


@app.before_request
def verify_token():
    if request.endpoint in ("login", "logout"):
        return
    if "Authorization" not in request.headers.keys():
        return Response(status=401)
    split_token = request.headers["Authorization"].split(' ')
    if (len(split_token) != 2 or
            split_token[0] != "Bearer" or
            split_token[1] not in tokens.values()):
        return Response(status=401)


@app.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    if not all(k in body for k in ("username", "password")):
        return Response(status=400)

    username = body["username"]
    password = body["password"]

    if (username not in app.config["CREDENTIALS"] or
            password != app.config["CREDENTIALS"][username]):
        return Response(status=404)

    if username not in tokens:
        new_token = secrets.token_hex(16)
        tokens[username] = new_token
    res_payload = {"token": tokens[username]}
    return jsonify(res_payload)


@app.route("/logout", methods=["POST"])
def logout():
    body = request.get_json()
    if "token" not in body:
        return Response(status=400)

    token = body["token"]

    if token not in tokens.values():
        return Response(status=404)

    for key, value in tokens.items():
        if value == token:
            tokens.pop(key)
            break

    return Response(status=204)


# Probably won't use templates since the Flask app will function solely as an
# API
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/users", methods=["GET", "POST"])
def users():
    db = get_db()

    if request.method == "GET":
        name = request.args.get("name")
        email = request.args.get("email")

        with db.cursor() as cursor:
            sql = "SELECT * FROM User WHERE 1"
            if name:
                sql += " AND name=%(name)s"
            if email:
                sql += " AND email=%(email)s"
            cursor.execute(sql, {"name": name, "email": email})
            data = cursor.fetchall()

        return jsonify(data)

    elif request.method == "POST":
        schema = UserSchema()
        try:
            user = schema.load(request.get_json())
        except ValidationError:
            # Bad request due to invalid object
            return Response(status=400)
        user_json = schema.dump(user)

        with db.cursor() as cursor:
            sql = "INSERT INTO User (name, email, account_created, bio) " \
                  "VALUES (%(name)s, %(email)s, %(account_created)s, %(bio)s)"
            cursor.execute(sql, user_json)
            db.commit()

            sql = "SELECT * FROM User WHERE id=%s"
            cursor.execute(sql, [cursor.lastrowid])
            inserted_row = cursor.fetchone()
        return jsonify(inserted_row), 201

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/users/<id>", methods=["GET", "PUT", "DELETE"])
def users_by_id(id):
    db = get_db()
    row = get_by_id(db.cursor(), "User", id)
    if not row:
        return Response(status=404)

    if request.method == "GET":
        return jsonify(row)

    elif request.method == "PUT":
        schema = UserSchema()
        try:
            user = schema.load(request.get_json())
        except ValidationError:
            return Response(status=400)
        user_json = schema.dump(user)

        with db.cursor() as cursor:
            sql = "UPDATE User SET name=%(name)s, email=%(email)s, " \
                  "bio=%(bio)s WHERE id=%(id)s"
            args = user_json
            args["id"] = id
            cursor.execute(sql, args)

        db.commit()
        row = get_by_id(db.cursor(), "User", id)
        return jsonify(row)

    elif request.method == "DELETE":
        delete_by_id(db.cursor(), "User", id)
        db.commit()
        return Response(status=204)

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/users/<id>/followers", methods=["GET"])
def followers(id):
    db = get_db()
    user = get_by_id(db.cursor(), "User", id)
    if not user:
        return Response(status=404)
    with db.cursor() as cursor:
        sql = "SELECT follower_id FROM Follow WHERE following_id=%s"
        cursor.execute(sql, [id])
        follower_ids = cursor.fetchall()

        sql = "SELECT * FROM User WHERE id IN (%s)"
        cursor.execute(
            sql,
            [', '.join(map(lambda x: str(x["follower_id"]), follower_ids))]
        )
        followers = cursor.fetchall()
        return jsonify(followers)


@app.route("/users/<id>/following", methods=["GET"])
def following(id):
    db = get_db()
    user = get_by_id(db.cursor(), "User", id)
    if not user:
        return Response(status=404)
    following_str = get_following_str(db.cursor(), id)

    with db.cursor() as cursor:
        sql = "SELECT * FROM User WHERE id IN (%s)"
        cursor.execute(sql, [following_str])
        following = cursor.fetchall()
    return jsonify(following)


@app.route("/users/<id>/feed", methods=["GET"])
def feed(id):
    db = get_db()
    user = get_by_id(db.cursor(), "User", id)
    if not user:
        return Response(status=404)
    following_str = get_following_str(db.cursor(), id)
    with db.cursor() as cursor:
        sql = "SELECT * FROM Message WHERE poster in (%s)"
        cursor.execute(sql, [following_str])
        feed = cursor.fetchall()
    return jsonify(feed)


@app.route("/messages", methods=["GET", "POST"])
def messages():
    db = get_db()

    if request.method == "GET":
        poster = request.args.get("poster")

        with db.cursor() as cursor:
            sql = "SELECT * FROM Message WHERE 1"
            if poster:
                sql += " AND poster=%(poster)s"
            cursor.execute(sql, {"poster": poster})
            messages = cursor.fetchall()

        return jsonify(messages)

    elif request.method == "POST":
        schema = MessageSchema()
        try:
            message = schema.load(request.get_json())
        except ValidationError:
            # Bad request due to invalid object
            return Response(status=400)
        message_json = schema.dump(message)

        with db.cursor() as cursor:
            sql = "INSERT INTO Message (poster, posted_date, message) " \
                  "VALUES (%(poster)s, %(posted_date)s, %(message)s)"
            cursor.execute(sql, message_json)
            db.commit()

            sql = "SELECT * FROM Message WHERE id=%s"
            cursor.execute(sql, [cursor.lastrowid])
            inserted_row = cursor.fetchone()
        return jsonify(inserted_row), 201

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/messages/<id>", methods=["GET", "DELETE"])
def messages_by_id(id):
    db = get_db()
    row = get_by_id(db.cursor(), "Message", id)
    if not row:
        return Response(status=404)

    if request.method == "GET":
        return jsonify(row)

    elif request.method == "DELETE":
        delete_by_id(db.cursor(), "Message", id)
        db.commit()
        return Response(status=204)

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/comments", methods=["GET", "POST"])
def comments():
    db = get_db()

    if request.method == "GET":
        message_id = request.args.get("message_id")
        commenter_id = request.args.get("commenter_id")

        with db.cursor() as cursor:
            sql = "SELECT * FROM Comment WHERE 1"
            if message_id:
                sql += " AND message_id=%(message_id)s"
            if commenter_id:
                sql += " AND commenter_id=%(commenter_id)s"
            args = {"message_id": message_id, "commenter_id": commenter_id}
            cursor.execute(sql, args)
            comments = cursor.fetchall()

        return jsonify(comments)

    elif request.method == "POST":
        schema = CommentSchema()
        try:
            comment = schema.load(request.get_json())
        except ValidationError:
            # Bad request due to invalid object
            return Response(status=400)
        comment_json = schema.dump(comment)

        with db.cursor() as cursor:
            sql = "INSERT INTO Comment (msg_id, commenter_id, posted_date, " \
                  "message) VALUES (%(msg_id)s, %(commenter_id)s, " \
                  "%(posted_date)s, %(message)s)"
            cursor.execute(sql, comment_json)
            db.commit()

            sql = "SELECT * FROM Comment WHERE id=%s"
            cursor.execute(sql, [cursor.lastrowid])
            inserted_row = cursor.fetchone()
        return jsonify(inserted_row), 201

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/comments/<id>", methods=["GET", "DELETE"])
def comments_by_id(id):
    db = get_db()
    row = get_by_id(db.cursor(), "Comment", id)
    if not row:
        return Response(status=404)

    if request.method == "GET":
        return jsonify(row)

    elif request.method == "DELETE":
        delete_by_id(db.cursor(), "Comment", id)
        db.commit()
        return Response(status=204)

    else:
        # Unsupported HTTP method
        return Response(status=405)


@app.route("/follows", methods=["POST", "DELETE"])
def follows():
    db = get_db()
    schema = FollowSchema()

    if request.method == "POST":
        try:
            follow = schema.load(request.get_json())
        except ValidationError:
            # Bad request due to invalid object
            return Response(status=400)
        follow_json = schema.dump(follow)

        follower = get_by_id(db.cursor(), "User", follow_json["follower_id"])
        following = get_by_id(db.cursor(), "User", follow_json["following_id"])

        # Make sure both users are in the database
        if not (follower and following):
            return Response(status=404)

        with db.cursor() as cursor:
            sql = "SELECT * FROM Follow WHERE follower_id=%(follower_id)s " \
                  "AND following_id=%(following_id)s"
            cursor.execute(sql, follow_json)
            row = cursor.fetchone()
            # Check if row already exists before creating
            if row:
                return Response(status=409)

            sql = "INSERT INTO Follow (follower_id, following_id) " \
                  "VALUES (%(follower_id)s, %(following_id)s)"
            cursor.execute(sql, follow_json)
        db.commit()
        return Response(status=201)

    elif request.method == "DELETE":
        try:
            follow = schema.load(request.args)
        except ValidationError:
            # Bad request due to invalid query parameters
            return Response(status=400)
        follow_json = schema.dump(follow)

        with db.cursor() as cursor:
            sql = "SELECT * FROM Follow WHERE follower_id=%(follower_id)s " \
                  "AND following_id=%(following_id)s"
            cursor.execute(sql, follow_json)
            row = cursor.fetchone()
            # Check if row does not exist before deleting
            if not row:
                return Response(status=404)

            sql = "DELETE FROM Follow WHERE follower_id=%(follower_id)s " \
                  "AND following_id=%(following_id)s"
            cursor.execute(sql, follow_json)
        db.commit()
        return Response(status=204)

    else:
        return Response(status=405)


def get_by_id(cursor, table, id):
    sql = f"SELECT * FROM {table} WHERE id=%s"
    cursor.execute(sql, [id])
    return cursor.fetchone()


def delete_by_id(cursor, table, id):
    sql = f"DELETE FROM {table} WHERE id=%s"
    cursor.execute(sql, [id])


# Returns a comma-separated string representing following ids
def get_following_str(cursor, id):
    sql = "SELECT following_id FROM Follow WHERE follower_id=%s"
    cursor.execute(sql, [id])
    following_ids = cursor.fetchall()
    return ', '.join(map(lambda x: str(x["following_id"]), following_ids))


def get_db():
    if not hasattr(g, "db"):
        # open new db connection
        g.db = pymysql.connect(
            host=app.config["DB_HOST"],
            user=app.config["DB_USERNAME"],
            password=app.config["DB_PASSWORD"],
            database=app.config["DB_NAME"],
            port=app.config["DB_PORT"],
            charset="utf8mb4",
            cursorclass=pymysql.cursors.DictCursor
        )
    return g.db


# Close db connection if open after request finishes or if error encountered
@app.teardown_appcontext
def teardown_db(error):
    if hasattr(g, "db"):
        # close db connection
        g.db.close()
        delattr(g, "db")
    if error is not None:
        app.logger.error(error)


if __name__ == "__main__":
    app.run()
