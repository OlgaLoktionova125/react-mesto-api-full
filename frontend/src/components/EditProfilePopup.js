import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);
    
    function handleChangeName(e) {
      setName(e.target.value);
    };
    
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    };

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль"
            buttonName="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input  className="popup__input popup__input_type_name"
                    type="text" 
                    value={name || ""}
                    placeholder="Имя" 
                    required 
                    name="name" 
                    onChange={handleChangeName}/>
            <span className="popup__input-error name-input-error"></span>
            <input  className="popup__input popup__input_type_job" 
                    type="text" 
                    value={description || ""}
                    placeholder="Вид деятельности" 
                    required 
                    name="about" 
                    onChange={handleChangeDescription} />
            <span className="popup__input-error job-input-error"></span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;