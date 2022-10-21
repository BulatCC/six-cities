import { memo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import { AppRoute } from '../../consts';
import { convertRating } from '../../services/utils';
import { OfferCardTypes } from '../../types/offers';


type OfferCardProps = {
  offer: OfferCardTypes;
  className: string;
  handleCardHover: (id: number) => void;
}

function OfferCard({ offer: { isFavorite, isPremium, price, title, type, rating, previewImage, id }, className, handleCardHover }: OfferCardProps): JSX.Element {
  const link = generatePath(AppRoute.Offer, { id: id.toString() });
  const onHover = () => {
    handleCardHover(id);
  };

  window.scrollTo(0, 0);

  return (
    <article className={`place-card ${className}`} onMouseEnter={onHover}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link} data-testid="offer-link">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            props={{ id, isFavorite }}
            style={{
              button: 'place-card__bookmark-button',
              svg: 'place-card__bookmark-icon',
              svgWidth: 18,
              svgHeight: 19,
            }} />
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
        <h2 className="place-card__name">
          <Link to={link}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(OfferCard, (prev, next) => prev.offer.id === next.offer.id);
