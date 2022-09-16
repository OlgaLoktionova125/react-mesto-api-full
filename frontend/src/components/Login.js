import { useState } from "react";

function Login(props) {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

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
        props.onLogin({email, password});
    }    

    return (
        <div className="sign">
            <h2 className="sign__heading">Вход</h2>
            <form className="sign__form" name="signIn" onSubmit={handleSubmit}>
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
                <button aria-label="вход" className="sign__submit-button" type="submit">Войти</button>                
            </form>
        </div>
    )
}

export default Login;