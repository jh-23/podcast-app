import React, { useEffect } from 'react';

function AllReviews() {

    useEffect(() => {
        fetch('/reviews')
            .then((r) => r.json())
            .then((reviews) => console.log(reviews))
    }, [])

    return(
        <h1>reviews</h1>
    )
}

export default AllReviews;