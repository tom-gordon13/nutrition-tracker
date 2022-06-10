import { useState } from "react"
import { useDrop } from 'react-dnd'
import './FoodBucket.css'
import FoodBucketLineItem from './FoodBucketLineItem'


export default function FoodBucket({ currentMeal, setCurrentMeal, currBucket, currDate, changeDate }) {
    let todayDate = new Date().toISOString().split('T')[0]
    let match = todayDate === currDate
    let disabled = 'disabled'

    function handleMealChange(evt) {
        setCurrentMeal(evt.target.value)
    }

    function handleDateChange(evt) {
        changeDate(evt.target.innerText)
    }

    return (
        <div className='d-flex flex-column justify-content-center flex-wrap align-items-center'>
            
            <h1> <button onClick={handleDateChange}>&lt;</button> {currDate} <button onClick={handleDateChange} {... match ? {disabled} : {}}  > &gt;</button> </h1>

            <label className='mb-2'>
                <h3 className='h4 m-2 d-flex flex-column'>Meal: </h3>
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
