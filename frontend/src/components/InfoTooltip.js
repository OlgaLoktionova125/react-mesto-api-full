function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button aria-label="закрыть" className="popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="popup__infoTooltipImg" src={props.infoTooltipImg} alt={props.infoTooltipAlt}/>  
                <p className="popup__infoTooltipText">{props.infoTooltipText}</p>           
            </div>
        </div>
    )
}

export default InfoTooltip;