import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Main from '../main/main';
import Login from '../login/login';
import NotFound from '../not-found/not-found';
import FavoritePage from '../favorite-page/favorite-page';
import Place from '../place/place';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Root} element={<Main />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={AppRoute.Offer} element={<Place />} />
      <Route path={AppRoute.Favorites}
        element={<PrivateRoute privateElement={<FavoritePage />} />}
      />
      <Route path={AppRoute.NotFound} element={<NotFound />} />
    </Routes>
  );
}

export default App;
