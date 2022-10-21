import { useSelector } from 'react-redux';
import Header from '../header/header';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import { Offer } from '../../types/offers';
import { State } from '../../store/root-reducer';

function FavoritePage(): JSX.Element {
  const offers = useSelector((state: State): Offer[] => state.DATA.defaultOffers);
  const favoriteData = offers.filter((offer) => offer.isFavorite);

  return (
    <div className={`page ${favoriteData.length ? '' : 'page--favorites-empty'}`}>
      <Header />
      {favoriteData.length ? <Favorites favoriteData={favoriteData} /> : <FavoritesEmpty />}
    </div>
  );
}

export default FavoritePage;
