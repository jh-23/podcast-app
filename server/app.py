#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import db, User, Podcast, UserPodcastReview

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/users', methods=['GET', 'POST'])
def users():
    
    if request.method == 'GET':
        users = [user.to_dict() for user in User.query.all()]
        
        response = make_response(
            users,
            200
        )
        
        return response
    
    elif request.method == 'POST':
        form_data = request.get_json()
        
        try:
            
            new_user_obj = User(
                username = form_data['username'],
                password = form_data['password']
            )
        
            db.session.add(new_user_obj)
            db.session.commit()
            
            new_user_obj_dict = new_user_obj.to_dict()
            
            response = make_response(
                new_user_obj_dict,
                201
            )
            
            return response
        
        except ValueError:
            return {'error': 'invalid username, must be between 4 and 14 characters'}, 422


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

       

@app.route('/users/<int:id>')
def user_by_id(id):
    
    user = User.query.filter(User.id == id).first()
        
    if user:
        user_dict = user.to_dict()
    
        response = make_response(
            user_dict,
            200
        )
    
        return response 
    
    else:
        response = make_response(
            {"error": "user not found"},
            404
        )
        
        return response


    
@app.route('/reviews', methods=['GET'])
def reviews():
    
    reviews = [review.to_dict() for review in UserPodcastReview.query.all()]
    
    response = make_response(
        reviews,
        200
    )

    return response




# Using Resources

class Login(Resource):
    def post(self):
        user = User.query.filter(User.username == request.get_json()['username']).first()
        
        session['user_id'] = user.id
        
        response = make_response(
            user.to_dict(),
            200
        )
        
        return response
    
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

