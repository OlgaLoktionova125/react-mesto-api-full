function PopupWithForm(props) {

    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{props.title}</h2>
                <button aria-label="закрыть" className="popup__close-button" type="button" onClick={props.onClose}></button>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}                
                    <button aria-label="подтверждение" className="popup__submit-button" type="submit">{props.buttonName}</button> 
                </form>               
            </div>
        </div>
    )
};

export default PopupWithForm;