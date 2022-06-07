import { useState } from "react"
import { useDrop } from 'react-dnd'
import './FoodBucket.css'
import FoodBucketLineItem from './FoodBucketLineItem'


export default function FoodBucket({ currentMeal, setCurrentMeal, currBucket}) {
    function handleMealChange(evt) {
        setCurrentMeal(evt.target.value)
    }

    return (
        <div className='d-flex flex-column justify-content-center flex-wrap align-items-center'>
            {/* <h1> <button>&lt;</button>{`${currBucket.date.substring(5,7)}/${currBucket.date.substring(8,10)}/${currBucket.date.substring(0,4)}`}<button>&gt;</button> </h1> */}
            <h1> <button>&lt;</button>Today's Date<button>&gt;</button> </h1>

            <label className='mb-2'>
                <strong className='h4'>Meal: </strong>
                <select onChange={handleMealChange} className='h4 ml-4'>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snacks">Snacks</option>
                </select>
            </label>
    
        </div>
    )
}
