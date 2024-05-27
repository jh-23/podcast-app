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
        
        #seed users
        users_to_add = []
        
        user1 = (User(
            id=1,
            username="jimjenkins"
        ))
        user1.password_hash = "rockstar"
        
        user2 = (User(
            id=2,
            username="jillpill"
        ))
        
        user2.password_hash="bffjillb2bc2"
        
        user3 = (User(
            id=3,
            username="podlover"
        ))
        
        user3.password_hash="8675309nine"
        
        users_to_add.append(user1)
        users_to_add.append(user2)
        users_to_add.append(user3)
        db.session.add_all(users_to_add)

        
        # seed podcasts
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
            episodes="2000",
            image="https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/17/a1/ce/17a1ce39-f248-8750-351a-0201206df213/mza_6600839420822557618.jpg/626x0w.webp",
            rating="4.5 out of 5"
        ))
        
        podcasts_to_add.append(Podcast(
            id=3,
            channel="The Joe Rogan Experience",
            podcast_start="2009",
            episodes="2156",
            image="https://upload.wikimedia.org/wikipedia/en/4/4b/The_Joe_Rogan_Experience_logo.jpg",
            rating="4.6 out of 5"
        ))
        
        podcasts_to_add.append(Podcast(
            id=4,
            channel="Dateline NBC",
            podcast_start="2019",
            episodes="523",
            image="https://i.iheart.com/v3/url/aHR0cHM6Ly9pbWFnZS5zaW1wbGVjYXN0Y2RuLmNvbS9pbWFnZXMvYWUxODNmZTItYzYzNC00NThhLTkzZGQtNTc3MGYwNjc2Zjc3L2IwMTA4MDlhLWMzMTEtNDI1Yy05MzI1LTIyMzVjMjFlNjkzOS8zMDAweDMwMDAvN2YwNDIxZjczZDJjZTBjYTI3MmUzOTJjOTM3ZTFhMzAxMjg1ZDQ0ZmU3YzZkNzEwYzI4NDRkODBjMGM3YmIxYTNlOTgzOGFjMDNlZTgwZmM2NDE5OTg5MWNiOWQ1YzZlOWQ0NDkwZjUwODFmYjM3OWMwYWIyMzE3ZjJjYWRmMTQuanBlZz9haWQ9cnNzX2ZlZWQ",
            rating="4.4 out of 5"
        ))
        
        podcasts_to_add.append(Podcast(
            id=5,
            channel="Huberman Lab",
            podcast_start="2020",
            episodes="221",
            image="https://supercast-storage-assets.b-cdn.net/channel/3050/artwork/medium-e94c6fcf00a6db9444f5c26eb44ef3e6.jpg",
            rating="4.8 out of 5"
        ))
        
        podcasts_to_add.append(Podcast(
            id=6,
            channel="The Rest is History",
            podcast_start="2020",
            episodes="620",
            image="https://i.scdn.co/image/ab6765630000ba8a053b0b90a2dcd86e3eaad82a",
            rating="4.7 out of 5"
        ))
        
        db.session.add_all(podcasts_to_add)

        
        #Seed UserPodcastReviews
        
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
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=3,
            user_id=3,
            podcast_id=3,
            podcast_review="I love how much energy and focus Joe Rogan puts into this podcast!  He gives his guests enough time to discuss topics in enough detail to understand and dappreciate what they have to offer!  Joe is so incredibly curious, intelligent and entertaining!"
        ))
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=4,
            user_id=2,
            podcast_id=4,
            podcast_review="The storyline was really put together well.  It's sadly very hard to understand the story teller.  I could only make out bits and pieces and was left with no details due to that issue.  If you can understand I believe this podcast is a very good one."
        ))
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=5,
            user_id=1,
            podcast_id=5,
            podcast_review="This is a great place to learn quickly and in depth about many human science topics. Keep up the great work!"
        ))
        
        user_podcast_reviews_to_add.append(UserPodcastReview(
            id=6,
            user_id=3,
            podcast_id=6,
            podcast_review="Listened to the 8 part series about the fall of the Aztects.  Riveting!" 
        ))
        
        db.session.add_all(user_podcast_reviews_to_add)
        
        db.session.commit()
        
        
