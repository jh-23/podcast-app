#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Podcast, UserPodcastReview


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Podcast.query.delete()
        UserPodcastReview.query.delete()
        
        jim = User(
            id=1,
            username="jimjenkins",
            password="rockstar"
        )
        
        jill = User(
            id=2,
            username="jillpill",
            password="bffjillb2bc2"
        )
        
        modern_wisdom = Podcast(
            id=1,
            channel="Modern Wisdom",
            podcast_start="2018",
            episodes="780",
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/99/dc/91/99dc9113-546a-038a-7204-84c6265b6766/mza_5176103474815286855.jpg/626x0w.webp",
            rating="4.7 out of 5"
        )
        
        stuff_you_should_know = Podcast(
            id=2,
            channel="Stuff You Should Know",
            podcast_start="2008",
            episodes=2000,
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/17/a1/ce/17a1ce39-f248-8750-351a-0201206df213/mza_6600839420822557618.jpg/626x0w.webp",
            rating="4.5 out of 5"
        )
        
        modern_wisdom_review = UserPodcastReview(
            id=1,
            
            
        )
        