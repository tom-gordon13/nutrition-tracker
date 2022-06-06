import { useState, useEffect } from "react"
import { useDrag } from 'react-dnd'

export default function FoodSearchDisplay({ food }) {
    let newFood = {
        itemName: food.description, 
        fdcId: food.fdcId
    }
    
    const [{ isDragging }, dragRef] = useDrag({
        type: 'foodItem',
        item: newFood,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div className='card border bg-primary' ref={dragRef}>
            <div className="card-content">
                <h3>Food: {food.description}</h3>
        
                {isDragging && '😱'}
                
            </div>
        </div>
    )
}