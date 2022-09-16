import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer";

function Main(props) {

    const cards = props.cards;    
    const currentUser = useContext(CurrentUserContext);    

    return(
        <>
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                    <button className="profile__edit-avatar" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="редактировать" className="profile__edit-button" onClick={props.onEditProfile} type="button"></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button aria-label="добавить" className="profile__add-button" onClick={props.onAddPlace} type="button"></button>
            </section>
            <section className="elements">
                <ul className="elements__container">
                    {cards.map((card) => (
                        <Card 
                            link={card.link}
                            name={card.name}
                            likes={card.likes}
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike ={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                            owner={card.owner._id}
                        />
                    ))}
                </ul>
            </section>            
        </main>
        <Footer />
        </>
    )
};

export default Main;