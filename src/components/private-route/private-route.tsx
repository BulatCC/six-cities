import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts';
import { State } from '../../store/root-reducer';
import Loader from '../loader/loader';

type JsxEl = {
  privateElement: JSX.Element,
}

function PrivateRoute({ privateElement }: JsxEl): JSX.Element {
  const authorizationStatus = useSelector((state: State): string => state.USER.authorizationStatus);
  switch (authorizationStatus) {
    case AuthorizationStatus.Unknown:
      return <Loader />;
    case AuthorizationStatus.Auth:
      return privateElement;
    case AuthorizationStatus.NoAuth:
      return <Navigate to={AppRoute.Login} />;
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default PrivateRoute;
