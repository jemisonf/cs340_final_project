from marshmallow import Schema, fields, post_load


class Follow(object):
    def __init__(self, follower_id, following_id):
        self.follower_id = follower_id
        self.following_id = following_id


class FollowSchema(Schema):
    follower_id = fields.Int(required=True)
    following_id = fields.Int(required=True)

    @post_load
    def make_follow(self, data):
        return Follow(**data)

    class Meta:
        unknown = "EXCLUDE"
