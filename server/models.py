from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __table__name = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    
    
class UserPodcastReviews(db.Model, SerializerMixin):
    pass



class Podcast(db.Model, SerializerMixin):
    __table__name = 'podcasts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column()
    
    

