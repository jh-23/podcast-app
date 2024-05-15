#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User, Podcast, UserPodcastReview

# if __name__ == '__main__':
#     fake = Faker()
with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Podcast.query.delete()
        UserPodcastReview.query.delete()
        
        #seed 2 users
        users_to_add = []
        
        users_to_add.append(User(
            id=1,
            username="jimjenkins",
            password="rockstar"
        ))
        
        users_to_add.append(User(
            id=2,
            username="jillpill",
            password="bffjillb2bc2"
        ))
        
        db.session.add_all(users_to_add)

        
        # seed 2 podcasts
        podcasts_to_add = []
        
        podcasts_to_add.append(Podcast(
            id=1,
            channel="Modern Wisdom",
            podcast_start="2018",
            episodes="780",
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/99/dc/91/99dc9113-546a-038a-7204-84c6265b6766/mza_5176103474815286855.jpg/626x0w.webp",
            rating="4.7 out of 5"
        ))
        
        podcasts_to_add.append(Podcast(
            id=2,
            channel="Stuff You Should Know",
            podcast_start="2008",
            episodes=2000,
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/17/a1/ce/17a1ce39-f248-8750-351a-0201206df213/mza_6600839420822557618.jpg/626x0w.webp",
            rating="4.5 out of 5"
        ))
        
        db.session.add_all(podcasts_to_add)

        
        #Seed 2 UserPodcastReviews
        
        user_podcast_reviews_to_add = []
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=1,
            user_id=1,
            podcast_id=1,
            podcast_review="Great conversations with a ton of personal psychological insights.  Help me to think and improve my daily life!"
        ))
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=2,
            user_id=2,
            podcast_id=2,
            podcast_review="Great podcast to learn something, and also great puns by the podcasters!"
        ))
        
        db.session.add_all(user_podcast_reviews_to_add)
        
        db.session.commit()
        
        
