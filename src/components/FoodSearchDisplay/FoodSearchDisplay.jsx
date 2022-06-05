import { useState, useEffect } from "react"

export default function FoodSearchDisplay({ food }) {
    

    return (
        <div className='card border bg-primary'>
            <div 
            className="card-content"
            draggable
            >



                <h3>Food: {food.description}</h3>
                <h3>Serving Size: {food.servingSize}{food.servingSizeUnit}</h3>
                <h3>Data Type: {food.dataType}</h3>
                {/* {food.foods[0].foodNutrients.map(nutrient =>
                <FoodTestCardNutrients nutrient={nutrient} />)} */}
            </div>
        </div>
    )
}