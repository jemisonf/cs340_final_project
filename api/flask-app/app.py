from flask import Flask, render_template, request, g, session, jsonify

app = Flask(__name__)


# Probably won't use templates since the Flask app will function solely as an API
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")


@app.route("/login", methods=["POST"])
def login():
    credentials = {
        "username": request.form["username"],
        "password": request.form["password"]
    }
    if credentials in app.config["credentials"]:
        session["user"] = request.form["username"]
        pass


@app.route("/logout", methods=["GET"])
def logout():
    pass


@app.route("/resourceName", methods=["GET", "POST", "PUT", "DELETE"])
def resource():
    mock_data = {
        "att1": "val1",
        "att2": "val2",
        "att3": "val3"
    }
    if request.method == "GET":
        # prepare SQL query from api call params
        # send query and store results
        # return results as json
        return jsonify(mock_data), status
    elif request.method == "POST":
        # prepare SQL query from api call params
        # send query
        # return something (could be created rows or no content)
        pass
    elif request.method == "PUT":
        # prepare SQL query from api call params
        # send query
        # return something (could be updated rows or no contents)
        pass
    elif request.method == "DELETE":
        # prepare SQL query from api call params
        # send query
        # return something (probably HTTP 204 (no content))
        pass


def get_db():
    if not hasattr(g, "db"):
        # g.db = open new db connection
        app.logger.info("Opening db")
    return g.db


# Close db connection if open after request finishes or if error encountered
@app.teardown_appcontext
def teardown_db(error):
    if hasattr(g, "db"):
        # close db connection
        app.logger.info("DB closed")
    if error is not None:
        app.logger.error(error)


if __name__ == "__main__":
    app.run()
