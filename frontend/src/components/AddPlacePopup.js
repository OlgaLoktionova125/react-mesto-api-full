import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const inputNameRef = useRef();
    const inputLinkRef = useRef();
    
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        })        
    };
    
    useEffect(() => {
        inputNameRef.current.value = "";
        inputLinkRef.current.value = "";
    }, [props.isOpen]);
    
    return(
        <PopupWithForm
            name="place"
            title="Новое место"
            buttonName="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >  
            <input 
                ref={inputNameRef}
                className="popup__input popup__input_type_place" 
                type="text" 
                placeholder="Название" 
                required 
                name="name"/>
            <span className="popup__input-error place-input-error"></span>
            <input 
                ref={inputLinkRef}
                className="popup__input popup__input_type_image" 
                type="url" 
                placeholder="Ссылка на картинку" 
                required 
                name="link"/>
            <span className="popup__input-error image-input-error"></span> 
        </PopupWithForm>  
    )
};

export default AddPlacePopup;