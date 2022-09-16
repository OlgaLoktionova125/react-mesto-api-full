import { Link, Route } from 'react-router-dom';

function Header(props) {
    return(
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__auth-info">
                {props.loggedIn && 
                    <>
                        <p className="header__email">{props.userData.email}</p>
                        <button onClick={props.onLogout} className="header__link">Выйти</button>
                    </>}                    
                <Route path="/sign-up">
                    <Link className="header__link" to="sign-in">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link className="header__link" to="sign-up">Регистрация</Link>
                </Route>
            </div>
        </header>
    )
}

export default Header;