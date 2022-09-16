import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        const {email, password} = data;
        props.onRegister({email, password});
    }

    return (
        <div className="sign">
            <h2 className="sign__heading">Регистрация</h2>
            <form className="sign__form" name="signUp" onSubmit={handleSubmit}>
                <input 
                    className="sign__input" 
                    name="email" 
                    placeholder="Email" 
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="sign__input" 
                    name="password" 
                    placeholder="Пароль" 
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
                <button aria-label="регистрация" className="sign__submit-button" type="submit">Зарегистрироваться</button>
                <p className="sign__text">Уже зарегистрированы? <Link to="/sign-in" className="sign__link">Войти</Link></p>
            </form>
        </div>
    )
}

export default Register;