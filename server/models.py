from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    
    __tablename__ = 'users'
    
    serialize_rules = ('-user_podcast_reviews.user', )
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
    # relationship method that maps User to related UserPodcastReview
    user_podcast_reviews = db.relationship('UserPodcastReview', back_populates='user', cascade='all, delete-orphan')

    # validation 
    @validates('username')
    def validate_username(self, key, username):
        if 4 <= len(username) <= 14:
            return username
        else:
            raise ValueError('Username must be between 4 and 14 characters, inclusive')
           
    
class UserPodcastReview(db.Model, SerializerMixin):
    
    __tablename__ = 'user_podcast_reviews'
    
    serialize_rules = ('-user.user_podcast_reviews', '-podcast.user_podcast_reviews')
    
    id = db.Column(db.Integer, primary_key=True)
    podcast_review = db.Column(db.String)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    podcast_id = db.Column(db.Integer, db.ForeignKey('podcasts.id'))
    
    #relationship method maps our UserPodcastReview to User
    user = db.relationship('User', back_populates='user_podcast_reviews')

    #relationship method maps our UserPodcastReview to Podcast
    podcast = db.relationship('Podcast', back_populates='user_podcast_reviews')

class Podcast(db.Model, SerializerMixin):
    
    __tablename__ = 'podcasts'
    
    serialize_rules = ('-user_podcast_reviews.podcast', )
    
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String)
    podcast_start = db.Column(db.String)
    episodes = db.Column(db.String)
    image = db.Column(db.String)
    rating = db.Column(db.String)

    #relationship method that maps our Podcast to UserPodcastReview
    user_podcast_reviews = db.relationship('UserPodcastReview', back_populates='podcast', cascade='all, delete-orphan')
    
    