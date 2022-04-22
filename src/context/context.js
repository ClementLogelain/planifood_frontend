import React, { useEffect, useState } from "react";
import * as mealService from "../services/MealService";
import * as planificationService from "../services/PlanificationsService";
import * as ingredientService from "../services/IngredientsService";

const Context = React.createContext(null);

const AppContext = (props) => {

    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null);

    const [meals, setMeals] = useState([]);

    const [appMeals, setAppMeals] = useState([]);

    const [planifications, setPlanfications] = useState([]);    

    const [myIngredients, setMyIngredients] = useState([]);

    const [appIngredients, setAppIngredients] = useState([]);

    useEffect(() => {
        async function fetch(){
            if(token && user){
                mealService.All(token).then((res) => {
                    setMeals(res.data);
                });

                mealService.AppMeals(token).then((res) => {
                    setAppMeals(res.data);
                });
    
                planificationService.All(token).then((res) => {
                    setPlanfications(res.data);
                });
    
                ingredientService.Mine(token).then((res) => {
                    setMyIngredients(res.data);
                });

                ingredientService.All(token).then((res) => {
                    setAppIngredients(res.data);
                });
            }
        };
        fetch();
    }, [user, token, setMeals, setPlanfications, setMyIngredients])

    const exposedValue = {
        user,
        setUser,
        token,
        setToken,
        meals,
        setMeals,
        appMeals,
        setAppMeals,
        planifications,
        setPlanfications,
        myIngredients,
        setMyIngredients,
        appIngredients,
        setAppIngredients
    }
  
    return (
        <Context.Provider value={exposedValue}>{props.children}</Context.Provider>
    );
};

export { Context, AppContext };
export default Context;