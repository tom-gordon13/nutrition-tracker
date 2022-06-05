import { useState } from "react"
import './FoodBucket.css'
import FoodBucketLineItem from './FoodBucketLineItem'

export default function FoodBucket() {
    let itemsArr = [
        {food: 'Kale', servingSize: '10g'},
        {food: 'Apple', servingSize: '10g'},
        {food: 'Bread', servingSize: '10g'},
    ]

    const [items, setItems] = useState(itemsArr)
    
    
    return (
        <div className='d-flex flex-column justify-content-center flex-wrap'>
            <h2>Food Bucket</h2>
            <div className='foodBucket border border-dark'>
                {items.map(item =>
                    <FoodBucketLineItem item={item} />)}
            </div>
        </div>
    )
}