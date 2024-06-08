#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Podcast, UserPodcastReview


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# User Routes - Resources

class Users(Resource):
    
    def get(self):
        
        user_dict_list = [user.to_dict() for user in User.query.all()]
        
        response = make_response(
            user_dict_list,
            200
        )
        
        return response
    
    def post(self):
        
        json = request.get_json()
        
        new_user = User(
            username = json.get('username'),
            password = json.get('password')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        response_dict = new_user.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response
    
api.add_resource(Users, '/users')

class UsersPodcasts(Resource):
    
    def get(self):
        
        user = User.query.filter(User.id == session['user_id']).first()
        
        return [podcast.to_dict() for podcast in set([podcast_review.podcast for podcast_review in user.user_podcast_reviews])]
    
    def post(self):
        
        json = request.get_json()
        
        user = User.query.filter(User.id == session['user_id']).first()
        
        new_podcast = Podcast(
            channel = json.get('channel'),
            podcast_start = json.get('podcast_start'),
            episodes = json.get('episodes'),
            image = json.get('image'),
            rating = json.get('rating')
        )

        db.session.add(new_podcast)
        db.session.commit()
        
        
        new_user_podcast_review = UserPodcastReview(            
            podcast_review = "",
            user_id = user.id,
            podcast_id = new_podcast.id
        )
        
        db.session.add(new_user_podcast_review)
        db.session.commit()
        
        response_dict = new_podcast.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response
    
api.add_resource(UsersPodcasts, "/userspodcasts")

class UserPodcastByIDAddReview(Resource):
    
    def post(self):
        
        json = request.get_json()
        
        user = User.query.filter(User.id == session['user_id']).first()
        
        id = json.get('podcast_id')
        podcast = Podcast.query.filter(Podcast.id == id).first()
        
        new_review = UserPodcastReview(
            podcast_review = json.get('podcast_review'),
            user_id = user.id,
            podcast_id = podcast.id
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        response_dict = new_review.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response
        
api.add_resource(UserPodcastByIDAddReview, "/userspodcastaddreview")

class UserPodcastsByID(Resource):
    
    def post(self):
        
        json = request.get_json()
        
        new_podcast = Podcast(
            channel = json.get('channel'),
            podcast_start = json.get('podcast_start'),
            episodes = json.get('episodes'),
            image = json.get('image'),
            rating = json.get('rating')
        )
        
        db.session.add(new_podcast)
        db.session.commit()
        
        response_dict = new_podcast.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response
    
    def patch(self, id):
        
        json = request.get_json()
        
        podcast = Podcast.query.filter(Podcast.id == id).first()
        for attr in json:
            setattr(podcast, attr, json[attr])
            
        db.session.add(podcast)
        db.session.commit()
        
        response = make_response(
            podcast.to_dict(),
            200
        )
        
        return response
    
    def delete(self, id):
        
        podcast = Podcast.query.filter_by(id=id).first()
        db.session.delete(podcast)
        db.session.commit()
        
        response = make_response({'message': 'successful deletion of podcast'}, 202)
        
        return response
    
api.add_resource(UserPodcastsByID, "/userspodcasts/<int:id>")

class PodcastReviews(Resource):
    
    def get(self, id):
        
        podcast = Podcast.query.filter(Podcast.id == id).first()
        
        return [podcast_review.to_dict() for podcast_review in podcast.user_podcast_reviews]
    
api.add_resource(PodcastReviews, '/podcastreviews/<int:id>')

class UserByID(Resource):
    
    def get(self, id):
        
        response_dict = User.query.filter_by(id=id).first().to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
api.add_resource(UserByID, '/users/<int:id>')


# Podcast Routes - Resources

class Podcasts(Resource):
    
    def get(self):
        podcast_dict_list = [podcast.to_dict() for podcast in Podcast.query.all()]
        
        response = make_response(
            podcast_dict_list,
            200)
        
        return response
    
    def post(self):
        
        json = request.get_json()
        
        new_podcast = Podcast(
            channel = json.get('channel'),
            podcast_start = json.get('podcast_start'),
            episodes = json.get('episodes'),
            image = json.get('image'),
            rating = json.get('rating')
        )
        
        db.session.add(new_podcast)
        db.session.commit()
        
        response_dict = new_podcast.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response

api.add_resource(Podcasts, '/podcasts')

class PodcastByID(Resource):
    
    def get(self, id):
        
        response_dict = Podcast.query.filter_by(id=id).first().to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
    def patch(self, id):
        
        json = request.get_json()
        
        podcast = Podcast.query.filter(Podcast.id == id).first()
        for attr in json:
            setattr(podcast, attr, json[attr])
            
        db.session.add(podcast)
        db.session.commit()
        
        response = make_response(
            podcast.to_dict(),
            200
        )
        
        return response
    
    def delete(self, id):
        
        podcast = Podcast.query.filter_by(id=id).first()
        db.session.delete(podcast)
        db.session.commit()
        
        response = make_response({'message': 'successful deletion of podcast'}, 202)
        
        return response

api.add_resource(PodcastByID, '/podcasts/<int:id>')

class UserPodcastReviews(Resource):
    
    def get(self):
        
        reviews_dict_list = [review.to_dict() for review in UserPodcastReview.query.all()]
        
        response = make_response(
            reviews_dict_list,
            200
        )
        
        return response

    def post(self):
        
        json = request.get_json()
        
        new_review = UserPodcastReview(
            podcast_review = json.get('podcast_review'),
            user_id = json.get('user_id'),
            podcast_id = json.get('podcast_id')
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        response_dict = new_review.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response
    
api.add_resource(UserPodcastReviews, '/reviews')
    
class UserPodcastReviewByID(Resource):
    
    def get(self, id):
        
        response_dict = UserPodcastReview.query.filter_by(id=id).first().to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
api.add_resource(UserPodcastReviewByID, '/reviews/<int:id>')

class Login(Resource):
    
    def post(self):
        
        username = request.get_json()['username']
        user = User.query.filter(User.username == username).first()
        
        password = request.get_json()['password']
        
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
            return user.to_dict()
        
        else:
            return {'error': 'Invalid username or password'}, 401
    
api.add_resource(Login, '/login')

class Logout(Resource):
    
    def delete(self):
        if session['user_id'] != None:
            session['user_id'] = None
            return {}, 204
        elif session['user_id'] == None:
            return {'error': 'message'}, 401

api.add_resource(Logout, '/logout', endpoint='logout')

class CheckSession(Resource):
    
    def get(self):
        
        user_id = session['user_id']
        user = User.query.filter(User.id == user_id).first()
        
        if user:
            response = make_response(
                user.to_dict(),
                200
            )
        else:
            response = make_response(
                {'message': 'error'},
                401
            )
            
        return response
    
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Signup(Resource):
    
    def post(self):
        
        json = request.get_json()
        user = User(
            username=json.get('username')
        )
        user.password_hash = json['password']
        
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return user.to_dict(), 201
        except IntegrityError:
            return {'error': 'invalid login credentials'}
        
api.add_resource(Signup, '/signup', endpoint='signup')

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]

    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401
    


if __name__ == '__main__':
    app.run(port=5555, debug=True)

