import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: inputRef.current.value
        })
    };

    return (
        <PopupWithForm 
            name="avatar"
            title="Обновить аватар"
            buttonName="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input 
                ref={inputRef}
                className="popup__input popup__input_type_avatar" 
                type="url" 
                placeholder="Ссылка на аватар"  
                required 
                name="avatar"/>
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;