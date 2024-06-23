import React from 'react';

function About() {
    return(
        <div>
            <h1 className='about'>About this website:</h1>
            <br />
            <br />
            <p className='about-paragraph'>In the Podcast Reviews App, a user can login and view your their podcast profiles.  Users can add new podcasts which they are listening to.
                Users can also edit their podcast profile information, delete a podcast.  They can also post a brand new review of their podcast to the podcast profile.  
                Users can also review all the reviews that a particular podcast has in the database.  
                <br />
                <br />
                New users can use the Sign up form on the front page to make their podcast account and start posting the podcasts they listen to!
                <br />
                <br />
                This full-stack application was created React as a front-end and Flask SQLAlchemy as the backend.  
            </p>
        </div>
    );
}

export default About;