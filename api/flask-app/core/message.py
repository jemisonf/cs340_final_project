from datetime import datetime

from marshmallow import Schema, fields, post_load


class Message(object):
    def __init__(self, poster, message):
        self.poster = poster
        self.message = message
        self.posted_date = datetime.isoformat(datetime.utcnow(), ' ')


class MessageSchema(Schema):
    poster = fields.Int(required=True)
    message = fields.Str(required=True)
    posted_date = fields.Str(required=True)

    @post_load
    def make_message(self, data):
        return Message(**data)

    class Meta:
        unknown = "EXCLUDE"
        dump_only = ["posted_date"]
