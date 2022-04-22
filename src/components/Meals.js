import React, { useContext, useState} from 'react';
import Context from '../context/context';
import AddMealModal from './MealAdd';
import "../styles/Meals.css";
import * as service from "../services/MealService";
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Meals() {

    const { meals, setMeals, token } = useContext(Context);

    const [openModal, setOpenModal] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const [mealToDelete, setMealToDelete] = useState({});

    const handleDeleteClose = () => {
        setOpenDelete(false);
    }

    const handleDeleteOpen = (meal) => {
        setOpenDelete(true);
        setMealToDelete(meal);
    }

    const handleDelete= () =>{
        service.Delete(mealToDelete.id, token).then((res) => {
            setMeals(meals.filter(meal => meal.id !== mealToDelete.id));
        });
        setOpenDelete(false);
    }

    return (
        <div className='meals'>
            <h2 className='title'>Mes Repas</h2>
            { meals.length >= 1 ? null : (
                <div className='no-meals'>
                    <h3>Il s'emblerait que vous  n'ayez pas  encore de repas ... Nous allons y remédier :</h3>
                </div>
            )}
            <div className='add-meal'>
                <Button onClick={() => {setOpenModal(true)}}>Ajouter un repas</Button>
            </div>
           

            {meals.map(meal => (
                <div className='meal' key={meal.id}>
                    <div className='meal-title'>
                        {meal.title}
                    </div>
                    <div className='meal-duration'>
                        {meal.duration}
                    </div>
                    <div className='meal-image'>
                        <img src='src/images/background-food.webp' alt='Nothing'></img>
                    </div>
                    
                    <Link to={{
                        pathname:'/meals/'+meal.id
                    }} ><VisibilityIcon></VisibilityIcon></Link>
                    
                    <Button variant="text" onClick={() => {handleDeleteOpen(meal)}}><DeleteIcon></DeleteIcon></Button>
                </div>
            ))}

            
            <AddMealModal
                openModal={openModal}
                setOpenModal={setOpenModal}>
            </AddMealModal>
            

            <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Supprimer un repas
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Etes vous sur de vouloir supprimer le repas : {mealToDelete.title}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDeleteClose}>Annuler</Button>
                <Button onClick={handleDelete} autoFocus>
                    Supprimer
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Meals;