import { useSelector } from 'react-redux';
import Header from '../header/header';
import MainOffers from '../main-offers/main-offers';
import MainEmpty from '../main-empty/main-empty';
import LocationsList from '../locations-list/locations-list';
import Loader from '../loader/loader';
import { State } from '../../store/root-reducer';

function Main(): JSX.Element {
  const mainProps = useSelector((state: State) => {
    return {
      offers: state.DATA.defaultOffers,
      selectedCity: state.DATA.selectedCity,
      isDataLoaded: state.DATA.isDataLoaded,
    };
  });

  const { offers, selectedCity, isDataLoaded } = mainProps;
  const offersInCity = offers.filter((offer) => offer.city.name === selectedCity);

  return (
    <div className={`page page--gray page--main ${offersInCity.length === 0 ? 'page__main--index-empty' : ''} `}>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        {isDataLoaded ?
          <div className="cities">
            {offersInCity.length ?
              <MainOffers offersInCity={offersInCity} selectedCity={selectedCity} /> :
              <MainEmpty selectedCity={selectedCity} />}
          </div>
          : <Loader />}
      </main>
    </div>
  );
}

export default Main;
