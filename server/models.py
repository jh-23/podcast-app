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
    
    # relationship
    user_podcast_reviews = db.relationship('UserPodcastReview', backpopulates=('user'))

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
    
    #relationship
    user = db.relationship('User', backpopulates=('user_podcast_reviews'))
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    podcast_id = db.Column(db.Integer, db.ForeignKey('podcasts.id'))

    #relationship
    podcast = db.relationship('Podcast', backpopulates=('user_podcast_review'))

class Podcast(db.Model, SerializerMixin):
    __tablename__ = 'podcasts'
    
    serialize_rules = ('-user_podcast_reviews.podcast', )
    
    id = db.Column(db.Integer, primary_key=True)
    channel = db.Column(db.String)
    years_active = db.Column(db.String)
    episodes = db.Column(db.String)
    image = db.Column(db.String)
    rating = db.Column(db.String)

    #relationship
    user_podcast_reviews = db.relationship('UserPodcastReview', backpopulates=('podcast'))
    
    
    

