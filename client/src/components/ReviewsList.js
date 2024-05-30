import React, { useEffect } from 'react';

function ReviewsList() {

    const [review, setReview] = useState("");

    useEffect(() => {
        fetch('/reviews')
            .then((r) => r.json())
            .then((review) => setReview(review))
    }, [])

    return(
        <h1>reviews</h1>
    )
}

export default ReviewsList;