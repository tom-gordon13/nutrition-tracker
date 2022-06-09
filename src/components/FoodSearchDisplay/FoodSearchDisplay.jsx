import { useState, useEffect } from "react"
import { useDrag } from 'react-dnd'
import './FoodSearchDisplay.css'

export default function FoodSearchDisplay({ food, searchResults, setSearchResults }) {
    let newFood = {
        itemName: food.description, 
        fdcId: food.fdcId,
        category: food.category,
        servingSize: food.servingSize,
        brandName: food.brandName,
        brandOwner: food.brandOwner,
    }
    console.log(newFood)
    const [{ isDragging }, dragRef] = useDrag({
        type: 'foodItem',
        item: newFood,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div className='card display-cards' ref={dragRef}>
            <div className="card-content m-0">
                <h6 className='m-0'>Food: {food.description}</h6>
                <p className='m-0'>Category: {food.foodCategory}</p>
                { food.brandOwner ? <p className='m-0'>Brand: {food.brandOwner} {food.brandName ? `(${food.brandName})` : ''} </p> : ''}
          
        
                {isDragging && '😱'}
                
            </div>
        </div>
    )
}

