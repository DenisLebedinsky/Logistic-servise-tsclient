import React, { useState, } from "react";
import { TextField, Button } from "@material-ui/core";
import styles from './LocationsModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'redux/reducers/auth/selectors';
import { addLocation, updateLocation } from "redux/reducers/locations/actions";

interface LocationsModalFC {
    closeModal: Function,
    editLocation: {
        _id: string;
        title: string;
    }
}

const LocationsModal: React.FC<LocationsModalFC> = ({ closeModal, editLocation }) => {
    const dispatch = useDispatch();
    const auth = useSelector(getAuth);

    const edit = editLocation._id !== '';

    const [title, setTitle] = useState(editLocation.title);
    const [err, setErr] = useState(false);

    const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!title) {
            setErr(true);
        } else {

            if (edit) {
                dispatch(updateLocation(auth.user.token, { id: editLocation._id, title }))

            } else {
                dispatch(addLocation(auth.user.token, { title }))
                closeModal();
            }
        }
    };

    return (
        <form
            id="form-create"
            className={styles.container}
            noValidate
            autoComplete="off"
        >
            <div className={styles.formContainer}>
                <div className={styles.itemInput}>
                    <TextField
                        id="outlined-username"
                        label="Название"
                        type="text"
                        className={styles.textField}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        variant="outlined"
                        error={err}
                    />
                </div>
                <div className={styles.footer}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                        onClick={sendData}
                    >
                        {edit ? "Изменить" : "Создать"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LocationsModal;