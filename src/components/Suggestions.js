import React, { useContext } from "react";
import Context from "../context/context";

function MyIngredients(){

    const { appMeals } = useContext(Context);
    return (
        <div>
            Voici nos suggestions
            <div className="suggestions">
                {appMeals.map(meal => (
                    <h2>{meal.title}</h2>
                ))}
            </div>
        </div>
    )
}

export default MyIngredients;