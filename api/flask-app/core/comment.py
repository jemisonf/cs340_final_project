from datetime import datetime

from marshmallow import Schema, fields, post_load


class Comment(object):
    def __init__(self, msg_id, commenter_id, message):
        self.msg_id = msg_id
        self.commenter_id = commenter_id
        self.message = message
        self.posted_date = datetime.isoformat(datetime.utcnow(), ' ')


class CommentSchema(Schema):
    msg_id = fields.Int(required=True)
    commenter_id = fields.Int(required=True)
    message = fields.Str(required=True)
    posted_date = fields.Str(required=True)

    @post_load
    def make_comment(self, data):
        return Comment(**data)

    class Meta:
        unknown = "EXCLUDE"
        dump_only = ["posted_date"]
