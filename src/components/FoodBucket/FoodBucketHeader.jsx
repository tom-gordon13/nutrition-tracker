import { useState } from "react"
import { useDrop } from 'react-dnd'
import './FoodBucket.css'
import FoodBucketLineItem from './FoodBucketLineItem'


export default function FoodBucket({ currentMeal, setCurrentMeal}) {
    function handleMealChange(evt) {
        setCurrentMeal(evt.target.value)
    }

    return (
        <div className='d-flex flex-column justify-content-center flex-wrap'>
            <h1> <button>&lt;</button>  June 5th, 2022 <button>&gt;</button> </h1>

            <label>
                <strong>Meal: </strong>
                <select onChange={handleMealChange}>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </label>
    
        </div>
    )
}
