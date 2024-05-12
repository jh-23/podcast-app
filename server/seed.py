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
            years_active="2018",
            episodes="780",
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/99/dc/91/99dc9113-546a-038a-7204-84c6265b6766/mza_5176103474815286855.jpg/626x0w.webp"
        )
        
        