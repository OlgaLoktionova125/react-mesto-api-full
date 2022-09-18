import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { useState, useEffect } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip";
import failure from '../images/failure.svg';
import success from '../images/success.svg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState({img:null, text:'', alt:''});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: ""});
  const history = useHistory();

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
        history.push("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipOpen(false);
    setInfoTooltipStatus({
      img: null,
      text: "",
      alt: ""
    })
  };  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  function handleCardClick(card) {
    setSelectedCard(card);    
  };

  function handleCardLike(card) {

    const isLiked = card.likes.some((item) => item === currentUser._id);
    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((card) => card._id === newCard._id ? newCard : card);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        const newCards = cards.filter((item) => item._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  };

  function handleUpdateUser({name, about}) {
    api.updateUserInfo({
      name: name,
      about: about
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function handleUpdateAvatar({avatar}) {
    api.setUserAvatar({
      avatar: avatar
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function handleAddPlaceSubmit({name, link}) {
    api.createCard({name: name, link: link})
      .then((data) => {
        const newCard = data;
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  function onRegister({email, password}) {
    auth.register(email, password)
      .then((data) => {
        if(data) {
          handleSuccess();
          history.push("/sign-in")
        } else {
          handleFailure();
        }
      })
      .catch(handleFailure);
  }

  function onLogin({email, password}) {
    auth.login(email, password)
      .then((data) => {
        setUserData({email: email});
        setLoggedIn(true);                
        localStorage.setItem("jwt", data.token);
        api.setJwt(data.token);        
      })
      .catch(handleFailure);
  }

  function handleFailure() {
    setInfoTooltipStatus({
      img: failure, 
      text: "Что-то пошло не так! Попробуйте ещё раз.", 
      alt: "Красный крест, изображающий неудачу"});
    setInfoTooltipOpen(true);
  }

  function handleSuccess() {
    setInfoTooltipStatus({
      img: success,
      text: "Вы успешно зарегистрировались!",
      alt: "Черная галочка, изображающая удачную регистрацию"
    })
    setInfoTooltipOpen(true);
  }

  function onLogout() {
    setUserData({
        email: "",
    });
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});    
  }

  function checkToken() {

    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.checkToken(jwt)
        .then(data => {
          setUserData({
            email: data.email,
        });
        setLoggedIn(true);
        history.push("/");
        })
        .catch(handleFailure);
    } else {
        setLoggedIn(false);
    }
  }  

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardsList()])
        .then(([info, cards]) => {
          setCurrentUser(info);
          setCards(cards.map((card) => ({
            _id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes,
            owner: card.owner._id
        })));
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header 
            onLogout={onLogout} 
            userData={userData} 
            loggedIn={loggedIn}
          />
          <Switch>      
            <ProtectedRoute 
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards = {cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register onRegister={onRegister}/>
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin}/>
            </Route>
            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch> 
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} 
          />              
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm 
            name="confirm"
            title="Вы уверены?"
            buttonName="Да"
            isOpen={false}
          />    
          <ImagePopup card={selectedCard} onClose={closeAllPopups}/>    
          <InfoTooltip 
            infoTooltipImg={infoTooltipStatus.img} 
            infoTooltipText={infoTooltipStatus.text} 
            infoTooltipAlt={infoTooltipStatus.alt} 
            isOpen = {isInfoTooltipOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div> 
    </CurrentUserContext.Provider>
  );
};

export default App;