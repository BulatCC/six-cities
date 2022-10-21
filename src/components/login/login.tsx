import { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../header/header';
import Loader from '../loader/loader';
import { loginAction } from '../../store/api-actions';
import { Navigate, Link } from 'react-router-dom';
import { AuthData } from '../../types/auth-data';
import { State } from '../../store/root-reducer';
import { AppRoute, AuthorizationStatus } from '../../consts';

function Login(): JSX.Element {
    //const authorizationStatus = useSelector((state: State): string => state.USER.authorizationStatus);

    const { authorizationStatus, selectedCity } = useSelector((state: State) => {
        return {
            selectedCity: state.DATA.selectedCity,
            authorizationStatus: state.USER.authorizationStatus,
        };
    });


    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: null,
        password: null,
    });

    if (authorizationStatus === AuthorizationStatus.Unknown) {
        return <Loader />;
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Root} />;
    }

    const handleSubmit = (authData: AuthData) => {
        dispatch(loginAction(authData));
    };

    const hadleFormChange = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    return (
        <div className="page page--gray page--login">
            <Header />
            <main className="page__main page__main--login">
                <div className="page__login-container container">
                    <section className="login">
                        <h1 className="login__title">Sign in</h1>
                        <p>(Для авторизации надо ввести любой <br /> валидный e-mail и любой пароль)</p>
                        <form data-testid="submit-form" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
                            evt.preventDefault();
                            handleSubmit(formData);
                        }} className="login__form form" action="#" method="post"
                        >
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">E-mail</label>
                                <input data-testid="login" onChange={hadleFormChange} className="login__input form__input" type="email" name="email" placeholder="Email" required />
                            </div>
                            <div className="login__input-wrapper form__input-wrapper">
                                <label className="visually-hidden">Password</label>
                                <input data-testid="password" onChange={hadleFormChange} className="login__input form__input" type="password" name="password" placeholder="Password" required />
                            </div>
                            <button className="login__submit form__submit button" type="submit">Sign in</button>
                        </form>
                    </section>
                    <section className="locations locations--login locations--current">
                        <div className="locations__item">
                            <Link to={AppRoute.Root} className="locations__item-link">
                                <span>{selectedCity}</span>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Login;
