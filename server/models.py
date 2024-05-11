from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
    #relationship
    user_podcast_reviews = db.relationship('UserPodcastReview', backpopulates=('user'))
    
    
class UserPodcastReview(db.Model, SerializerMixin):
    __tablename__ = 'user_podcast_reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    
    user = db.relationship('User', backpopulates=(''))
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    podcast_id = db.Column(db.Integer, db.ForeignKey('podcasts.id'))


class Podcast(db.Model, SerializerMixin):
    __tablename__ = 'podcasts'
    
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String)
    years_active = db.Column(db.String)
    episodes = db.Column(db.String)
    image = db.Column(db.String)

    
    
    

