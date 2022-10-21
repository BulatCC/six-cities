import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { ReviewBackend } from '../../types/reviews';
import { postReview } from '../../store/api-actions';

type PropsReviewForm = {
  hotelId?: string,
}

const ratingData = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

function ReviewForm({ hotelId }: PropsReviewForm): JSX.Element {
  const [review, setReview] = useState({
    rating: '',
    comment: '',
    id: hotelId,
  });

  const dispatch = useDispatch();

  const hadleFormChange = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setReview({
      ...review,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (reviewData: ReviewBackend) => {
    dispatch(postReview(reviewData));
    setReview({
      ...review,
      rating: '',
      comment: '',
    });
  };

  return (
    <form onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      handleSubmit(review);
    }} className="reviews__form form" action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingData.map((title, i) => (
          <>
            <input data-testid={`radio-rate-${ratingData.length - i}`} onChange={hadleFormChange} className="form__rating-input visually-hidden" name="rating" value={`${ratingData.length - i}`} id={`${ratingData.length - i}-stars`} type="radio" checked={review.rating === `${ratingData.length - i}`} />
            <label htmlFor={`${ratingData.length - i}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </>
        ))}
      </div>
      <textarea data-testid="text-area" onChange={hadleFormChange} className="reviews__textarea form__textarea" id="review" name="comment" placeholder="Tell how was your stay, what you like and what can be improved" value={review.comment}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.comment.length < 50}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
