


import {Request, Response} from 'express';
import {REVIEWS} from "./db-movie";
import {setTimeout} from "timers";



export function searchReviews(req: Request, res: Response) {

    const queryParams = req.query;

    const reviewId = queryParams.reviewId,
          filter = queryParams.filter || '',
          sortOrder = queryParams.sortOrder || 'asc',
          pageNumber = parseInt(queryParams.pageNumber) || 0,
          pageSize = parseInt(queryParams.pageSize) || 3;

    let reviews = Object.values(REVIEWS).filter(review => review.movieId === reviewId).sort((l1, l2) => l1.id - l2.id);

    if (filter) {
       reviews = reviews.filter(review => review.description.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        reviews = reviews.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const reviewsPage = reviews.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({payload: reviewsPage});
    }, 1000);
}