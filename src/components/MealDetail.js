import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Radio, RadioGroup, TextField, Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Context from '../context/context';
import * as service from "../services/MealService";
import * as ingredientService from "../services/IngredientsService";
import "../styles/MealDetail.css";
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

function MealDetail(props) {

    const { user, token, myIngredients, appIngredients } = useContext(Context);
    
    const [meal, setMeal] = useState({});
    const location = useLocation();
    let mealId = location.pathname.match(/(\d+)/);

    const [title, setTitle] = useState('');
    const [process, setProcess] = useState('');
    const [duration, setDuration] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [tabValue, setTabValue] = useState('1');

    const [ingredientTabSelected, setIngredientTabSelected] = useState();
    const [ingredientUsing, setIngredientUsing] = useState();

    const [addIngredientModal, setAddIngredientModal] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const [usingToDelete, setUsingToDelete] = useState({});
    const [usingNameToDelete, setUsingNameToDelete] = useState({})

    const [modeView, setModeView] = useState(true);


    useEffect(()=> {
        async function fetch(){
            if(Object.keys(meal).length === 0){
                service.SingleMeal(mealId[0], token).then((res) => {
                    setMeal(res.data);
                    setTitle(res.data.title);
                    setProcess(res.data.process);
                    setDuration(res.data.duration);
                    setIngredients(res.data.ingredients);
                });
            }
        }
        fetch();
    });

    const swapMode = () => {
        setModeView(!modeView);
    }


    const handleMealTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleMealProcess = (e) => {
        setProcess(e.target.value);
    };
    const handleMealDuration = (e) => {
        setDuration(e.target.value);
    };
    const mealDatas = {
        "id":meal.id,
        "title":title,
        "process":process,
        "duration":duration,
        "isBasic":false,
        "owner":user.id
    }
    const saveMeal = () => {
        service.Update(mealDatas, token).then((res) => {
            setMeal(res.data);
            swapMode();
        });
    }


    const handleTabChange = (e, newVal) => {
        setTabValue(newVal);
    }


    const handleIngredientSelected = (e) => {
        setIngredientTabSelected(e.target.value);
        console.log(e.target.value);
    }
    const handleAddIngredient = () => {
        setAddIngredientModal(true);
    }
    const closeModal = () => {
        setAddIngredientModal(false);
    }
    const handleNewUsing = (using) => {
        setIngredientUsing(using);
    }
    const newUsingDatas = {
        "using":ingredientUsing,
        "meal":meal.id,
        "ingredient":ingredientTabSelected
    }
    const addNewIngredient = () => {
        ingredientService.AddUsing(newUsingDatas, token).then((res) => {
            setAddIngredientModal(false);
            setIngredients(ingredients => [...ingredients, res.data]);
        });
    }

    const deleteIngredientModal = (using) => {
        setUsingToDelete(using.id);
        setUsingNameToDelete(using.ingredient.name);
        setOpenDelete(true);
    }
    const handleDeleteClose = () => {
        setOpenDelete(false);
    }
    const deleteIngredient = () => {
        ingredientService.DeleteUsing(usingToDelete, token).then((res) => {
            setOpenDelete(false);
            setIngredients(ingredients.filter(ingredient => ingredient.id !== usingToDelete));
        });
    }

  
      return (
       <div className='meal-form'>
           <h2 className='text-center'>Detail du repas</h2>
           { modeView ? 
           (
            <div className='meal-view' >
                <div className='mode'><Button size="large" onClick={swapMode}>Mode édition</Button></div>
                <Box sx={{ width: '100%', maxWidth: 500 , position: 'relative', left: '20%', marginTop: '100px'}}>
                    <Typography variant="h4" component="div" gutterBottom sx={{ marginBottom: '100px' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" gutterBottom component="div" sx={{ marginBottom: '100px' }}>
                        Préparation : <br></br><br></br>{process}
                    </Typography>
                    <Typography variant="h4" gutterBottom component="div" sx={{ marginBottom: '100px' }}>
                        Durée : <br></br><br></br>{duration} minutes
                    </Typography>
                    <Typography variant="h4" gutterBottom component="div" sx={{ marginBottom: '100px' }}>
                        Ingrédients nécessaire : <br></br><br></br>
                        <ul className='ingredients'>
                            {ingredients.map(using => (
                                <li key={using.id}>{using.ingredient.name} -- {using.using}</li>
                            ))}
                         </ul>
                    </Typography>
                </Box>
            </div>
           ) 
           : 
           (
            <div className='meal-detail'>
                <div className='mode'><Button onClick={swapMode}>Mode Vue</Button></div>
                <div className='meal-input'>
                    <label className='meal-label'>Titre du repas</label>
                    <TextField id='title' variant="filled" value={title} onChange={handleMealTitle}></TextField>
                </div>
                <div className='meal-input'>
                    <label className='meal-label'>Processus de preparation</label>
                    <TextField id='process' variant="filled" value={process} onChange={handleMealProcess} multiline></TextField>
                </div>
                <div className='meal-ingredients'>
                    <label className='ingredients-label'>Ingrédients utilisé :</label>
                    <ul className='ingredients'>
                    {ingredients.map(using => (
                        <li key={using.id}>{using.ingredient.name} - {using.using}<Button onClick={() => {deleteIngredientModal(using)}}><DeleteIcon></DeleteIcon></Button></li>
                    ))}
                    </ul>
                </div>
                <div className='meal-input'>
                    <label className='meal-label'>Durée de préparation</label>
                    <TextField id='duration' variant="filled" type="number" value={duration} onChange={handleMealDuration}></TextField>
                </div>
                
                <div className='ingredient-tab'>
                    <TabContext value={tabValue} sx={{ heigth: 'fit-content' }}>
                        <TabList sx={{ borderBottom: 1, borderColor: 'divider', width: 'fit-content' }} onChange={handleTabChange}>
                            <Tab label="Mes ingrédients" value="1" />
                            <Tab label="Ingrédients suggérés" value="2"/>
                        </TabList>
                        <TabPanel value="1">
                            <RadioGroup>
                                {myIngredients.map(ingredient => (
                                    <FormControlLabel key={ingredient.id} control={<Radio value={ingredient.id} checked={parseInt(ingredientTabSelected) === ingredient.id } onChange={handleIngredientSelected}/>} label={ingredient.name}/>
                                ))}
                            </RadioGroup>
                        </TabPanel>
                        <TabPanel value="2">
                            <RadioGroup>
                            {appIngredients.map(ingredient => (
                                    <FormControlLabel key={ingredient.id} control={<Radio value={ingredient.id} checked={parseInt(ingredientTabSelected) === ingredient.id }  onChange={handleIngredientSelected}/>} label={ingredient.name}/>
                                ))}
                            </RadioGroup>
                        </TabPanel>
                    </TabContext>
                    <Button disabled={!ingredientTabSelected} onClick={handleAddIngredient}>Ajouter l'ingrédient</Button>

                    <Dialog
                        open={addIngredientModal}
                        onClose={closeModal}
                    >
                        <DialogContent>
                            <DialogContentText>De quelle manière cet ingrédient doit-il être utilisé dans le plat ?</DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="using"
                                label="Utilisation"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => { handleNewUsing(e.target.value)}}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button disabled={!ingredientUsing} onClick={addNewIngredient}>Ajouter</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openDelete}
                        onClose={handleDeleteClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Supprimer l'utilisation d'un ingrédient
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Etes vous sur de ne plus utiliser l'ingrédient '{usingNameToDelete}' dans ce repas ?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteClose}>Annuler</Button>
                            <Button onClick={deleteIngredient} autoFocus>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            <Button onClick={saveMeal}>Enregistrer</Button>
           </div>
           )}
       </div>
        );
}

export default MealDetail;