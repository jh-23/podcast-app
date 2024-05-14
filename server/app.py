#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
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
    
    # elif request.method == 'POST':
    #     form_data = request.get_json()
        
    #     try:
            
    #         new_user_obj = User(
    #             username = form_data['username'],
    #             password = form_data['password']
    #         )
        
    #         db.session.add(new_user_obj)
    #         db.session.commit()
            
    #         new_user_obj_dict = new_user_obj.to_dict()
            
    #         response = make_response(
    #             new_user_obj_dict,
    #             201
    #         )
            
    #         return response
        
    #     except ValueError:
    #         return {'error': 'invalid username, must be between 4 and 14 characters'}, 422
        

@app.route('/podcasts', methods=['GET'])
def podcasts():
    
    podcasts = [podcast.to_dict() for podcast in Podcast.query.all()]
    
    response = make_response(
        podcasts,
        200
    )
    
    return response

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

@app.route('/podcasts/<int:id>', methods=['DELETE'])
def podcast_by_id(id):
    
    podcast = Podcast.query.filter(Podcast.id == id).first()
    
    if podcast:
        
        db.session.delete(podcast)
        
        db.session.commit()
        
        response = make_response(
            {},
            202
        )
        
        return response
        
    else:
        response = make_response(
            {"error": "Podcast not found!"},
            404
        )
        
        return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)

