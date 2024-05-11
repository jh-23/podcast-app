from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __table__name = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
    
class UserPodcastReview(db.Model, SerializerMixin):
    __table__name = 'user_podcast_reviews'
    
    id = db.Column(db.Integer, primary_key=True)


class Podcast(db.Model, SerializerMixin):
    __table__name = 'podcasts'
    
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String)
    years_active = db.Column(db.String)
    episodes = db.Column(db.String)
    image = db.Column(db.String)

    
    
    

