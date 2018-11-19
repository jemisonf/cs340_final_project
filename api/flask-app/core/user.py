from datetime import datetime

from marshmallow import Schema, fields, post_load


class User(object):
    def __init__(self, name, email, bio):
        self.name = name
        self.email = email
        self.bio = bio
        self.account_created = datetime.isoformat(datetime.utcnow(), ' ')


class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    bio = fields.Str(required=True)
    account_created = fields.Str(required=True)

    @post_load
    def make_user(self, data):
        return User(**data)

    class Meta:
        unknown = "EXCLUDE"
        dump_only = ["account_created"]
