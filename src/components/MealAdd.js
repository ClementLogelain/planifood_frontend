import React, { useContext, useEffect, useState } from 'react';
import * as service from '../services/MealService';
import Context from '../context/context';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';


function AddMealModal(props) {

    const [openModal, setOpenModal] = useState(props.openModal);

    useEffect(()=> {
        setOpenModal(props.openModal);
    }, [props.openModal])

    const [title, setTitle] = useState('');
    const [process, setProcess] = useState('');
    const [duration, setDuration] = useState(0);

    const { user, setMeals, token } = useContext(Context);

    const mealDatas = {
        "title":title,
        "process":process,
        "duration":duration,
        "isBasic":false,
        "owner":user.id
    }

    const handleClose = () => {
        setOpenModal(false);
        props.setOpenModal(false);
    }

    const submit = () => {
        service.Create(mealDatas, token).then((res) => {
            setMeals(meals => [...meals, res.data]);
            handleClose();
        }).catch((msg)  => {
            console.log(msg.message);
        });
        setOpenModal(false);
        props.setOpenModal(false);
    }

    return (
        <Dialog
            open={openModal}
            onClose={handleClose}
            >
            <DialogTitle>Ajout d'un repas</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Entrez les informations principales du repas, vous serez redirigez vers le repas en question une foisc réer
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => { setTitle(e.target.value)}}
                />
                 <TextField
                    margin="dense"
                    id="process"
                    label="Processus de fabrication"
                    type="text"
                    fullWidth
                    multiline
                    variant="standard"
                    onChange={(e) => { setProcess(e.target.value)}}
                />
                 <TextField
                    margin="dense"
                    id="duration"
                    label="Durée (min)"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(e) => { setDuration(e.target.value)}}
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={submit}>Ajouter</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddMealModal;