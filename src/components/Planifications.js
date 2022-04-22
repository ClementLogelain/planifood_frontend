import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React, { useContext, useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Context from "../context/context";
import "../styles/Planifications.css";

function Planifications() {

    const { planifications, meals } = useContext(Context);

    const [dateSelected, setDateSelected] = useState();
    const [mealSelected, setMealSelected] = useState('');

    const onChangeDate = (date) => {
        setDateSelected(date);
    }

    const onChangeMeal = (e) => {
        setMealSelected(e.target.value);
    }

    const addPlanification = () => {
        console.log(dateSelected.toLocaleDateString());
        console.log(mealSelected);
    }

    return (
        <div className="planifications">
            Mes repas planifiés:
            {planifications.map(planification => (
                <div key={planification.id}>
                    {planification.meal.title} prévu pour le {planification.panified_at}
                </div>
            ))}

            Choisisez un repas a planifiez:
            <FormControl>
                <Select
                        labelId="mealSelected"
                        id="meal"
                        value={mealSelected}
                        label="Meal"
                        onChange={onChangeMeal}>
                {meals.map(meal => (
                    <MenuItem value={meal} key={meal.id}>{meal.title}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <div className="calendar">
                <Calendar onChange={onChangeDate} value={dateSelected}/>
            </div>
            <Button variant="primary" onClick={addPlanification}>Add</Button>
        </div>
    );
}

export default Planifications;