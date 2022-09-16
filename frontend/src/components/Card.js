import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

    const currentUser = useContext(CurrentUserContext);
    const card = props.card;
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`element__trash ${isOwn ? 'element__trash_active' : 'element__trash_unactive'}`);
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`);

    function handleClick() {
        props.onCardClick(card);
    };

    function handleLikeClick() {
        props.onCardLike(card);
    };

    function handleDeleteClick() {
        props.onCardDelete(card);
    };
 
    return(
        <li className="element">
            <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
            <button aria-label="удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
            <div className="element__content">
                <h2 className="element__place">{props.name}</h2>
                <div>
                    <button aria-label="нравится" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="element__likeCount">{props.likes.length}</p>
                </div>
            </div>
        </li>
    )
};

export default Card;