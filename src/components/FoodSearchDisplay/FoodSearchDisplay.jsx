import { useState, useEffect } from "react"
import { useDrag } from 'react-dnd'
import './FoodSearchDisplay.css'

export default function FoodSearchDisplay({ food }) {
    let newFood = {
        itemName: food.description, 
        fdcId: food.fdcId,
        category: food.category
    }
    
    const [{ isDragging }, dragRef] = useDrag({
        type: 'foodItem',
        item: newFood,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div className='card display-cards' ref={dragRef}>
            <div className="card-content">
                <h5>Food: {food.description}</h5>
                <h6>Category: {food.foodCategory}</h6>
                { food.brandOwner ? <h6>Brand: {food.brandOwner} ({food.brandName})</h6> : ''}
          
        
                {isDragging && '😱'}
                
            </div>
        </div>
    )
}