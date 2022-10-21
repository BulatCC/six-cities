import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  handleHoveredCard: (id: number) => void;
}

function OffersList({offers, handleHoveredCard}: OffersListProps): JSX.Element {
  const handleCardHover = (id: number):void => {
    handleHoveredCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content" data-testid="offers-list">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} handleCardHover={handleCardHover} className={'cities__place-card'} />)}
    </div>
  );
}

export default OffersList;
