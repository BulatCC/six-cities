import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreator } from '../../store/actions';
import FavoriteCard from '../favorite-card/favorite-card';
import { Offer, SortedData, CityOffers } from '../../types/offers';
import { AppRoute } from '../../consts';

type FavoriteProps = {
  favoriteData: Offer[];
}

function Favorites({ favoriteData }: FavoriteProps): JSX.Element {
  const checkKeyValue = (obj: Record<string, Offer[]>, value: string) => {
    let isTrue;
    Object.keys(obj).forEach((key) => key === value ? isTrue = true : isTrue = false);
    return isTrue;
  };

  const getSortedData = (favoriteOffers: Offer[]): SortedData[] => {
    const cityOffers: CityOffers = {};
    const favorites = [];

    favoriteOffers.forEach((favorite) => {
      if (!checkKeyValue(cityOffers, favorite.city.name)) {
        cityOffers[favorite.city.name] = [favorite];
      } else {
        cityOffers[favorite.city.name].push(favorite);
      }
    });

    for (const city in cityOffers) {
      favorites.push({
        cityName: city,
        data: cityOffers[city],
      });
    }

    favorites.sort((a, b) => {
      if (a.cityName.toLowerCase() < b.cityName.toLowerCase()) {
        return -1;
      }
      if (a.cityName.toLowerCase() > b.cityName.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return favorites;
  };

  const sortedData = getSortedData(favoriteData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCityClick = (city: string) => {
    dispatch(actionCreator.сhangeSelectedCity(city));
    navigate(AppRoute.Root);
  };

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {sortedData.map((offer) => (
              <li className="favorites__locations-items" key={offer.cityName}>
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a href="#" className={'locations__item-link'} onClick={(evt) => {
                      evt.preventDefault();
                      handleCityClick(offer.cityName);
                    }} data-testid="city"
                    >
                      <span>{offer.cityName}</span>
                    </a >
                  </div>
                </div>
                <div className="favorites__places" data-testid="card-list">
                  {offer.data.map((offerData) => <FavoriteCard key={offerData.id} offer={offerData} />)}
                </div>
              </li>
            ),
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
