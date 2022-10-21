import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../store/root-reducer';
import { AppRoute, AuthorizationStatus, ApiRoute } from '../../consts';
import { actionCreator } from '../../store/actions';
import { createApi } from '../../services/api';

type FavoriteButtonProps = {
  props: {
    id: number;
    isFavorite: boolean;
  },
  style: {
    button: string;
    svg: string;
    svgWidth: number;
    svgHeight: number;
  }
}

function FavoriteButton({ props: { id, isFavorite }, style: { button, svg, svgWidth, svgHeight } }: FavoriteButtonProps): JSX.Element {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
  const authorizationStatus = useSelector((state: State): string => state.USER.authorizationStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      return navigate(AppRoute.Login);
    }

    const api = createApi();
    AuthorizationStatus.Auth && api.post(`${ApiRoute.Favorite}/${id}/${+!favoriteStatus}`)
      .then(({ data }) => {
        dispatch(actionCreator.updateFavoriteId(id));
        setFavoriteStatus(data.isFavorite);
      });
  };

  return (
    <button onClick={handleFavoriteClick} className={`${button} button ${favoriteStatus ? `${button}--active` : ''}`} type="button" data-testid="favorite-button">
      <svg className={svg} width={svgWidth} height={svgHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
