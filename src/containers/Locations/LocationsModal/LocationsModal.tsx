import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import styles from './LocationModal.module.scss';

const LocationsModal = ({ token, closeModal, editLoc }) => {
    let initialLoc = "";

    const edit = editLoc.hasOwnProperty("_id");
    if (edit) {
        initialLoc = editLoc.title;
    }

    const [loc, setLoc] = useState(initialLoc);
    const [err, setErr] = useState(false);

    const sendData = async e => {
        e.preventDefault();

        if (!loc) {
            setErr(true);
        } else {
            let res;
            if (edit) {
                res = await updateLocation({ id: editLoc._id, title: loc }, token);
            } else {
                res = await createLocations({ title: loc }, token);
            }
            if (res !== "erroe") {
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
            onSubmit={e => sendData(e)}
        >
            <div className={styles.formContainer}>
                <div className={styles.itemInput}>
                    <TextField
                        id="outlined-username"
                        label="Название"
                        type="text"
                        className={styles.textField}
                        value={loc}
                        onChange={e => setLoc(e.target.value)}
                        variant="outlined"
                        error={err}
                    />
                </div>
                <div className={styles.footer}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                    >
                        {edit ? "Изменить" : "Создать"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default LocationsModal;