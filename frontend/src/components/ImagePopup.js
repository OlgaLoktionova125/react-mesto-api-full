function ImagePopup(props) {
    return (
        <div className={`popup ${props.card.link && "popup_opened"}`}>
            <div className="popup__content">
                <img className="popup__img" src={props.card.link} alt={props.card.name}/>
                <button aria-label="закрыть" className="popup__close-button" type="button" onClick={props.onClose}></button>
                <p className="popup__text">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;