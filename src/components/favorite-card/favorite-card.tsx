import { Link, generatePath } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import { convertRating } from '../../services/utils';
import { OfferCardTypes } from '../../types/offers';
import { AppRoute } from '../../consts';

type FavoriteCardProps = {
  offer: OfferCardTypes;
}

function FavoriteCard({ offer: { isFavorite, price, title, type, rating, previewImage, id } }: FavoriteCardProps): JSX.Element {
  const link = generatePath(AppRoute.Offer, { id: id.toString() });

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={link} data-testid="favorite-img-link">
          <img data-testid="favorite-img" className="place-card__image" src={previewImage} width="150" height="110" alt="place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b data-testid="favorite-price" className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            props={{ id, isFavorite }}
            style={{
              button: 'place-card__bookmark-button',
              svg: 'place-card__bookmark-icon',
              svgWidth: 18,
              svgHeight: 19,
            }} data-testid="favorite-button"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{
              width: convertRating(rating),
            }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 data-testid="favorite-title" className="place-card__name">
          <Link to={link}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
