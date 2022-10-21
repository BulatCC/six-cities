import Header from '../header/header';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../consts';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <div style={{
          margin: 'auto',
        }}
        >
          <h1>Страница не найдена</h1>
          <NavLink to={AppRoute.Root} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
          >
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" style={{
              marginRight: '20px',
            }}
            />
            На главную
          </NavLink>
        </div>

      </main>
    </div>
  );
}

export default NotFound;
