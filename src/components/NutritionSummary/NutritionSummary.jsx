import { useEffect, useState } from 'react'
import './NutritionSummary.css'
import * as foodBucketAPI from '../../utilities/foodBuckets-api'


export default function NutritionSummary({ currDate, currBucket }) {
    const [bucketNutrients, setBucketNutrients] = useState(null)


    useEffect(function() {
        async function getBucketNutrients() {
            if (currBucket) {
                let newNutrients = await foodBucketAPI.getBucketNutrients(currBucket._id, currDate)
                console.log(newNutrients)
            }
        }
        getBucketNutrients()
    }, [currBucket])
    
    
    
    return (
        <div className='card'>
            <div className="card-content">
                <h2>Nutrition Summary</h2>
                <h5>{currDate}</h5>
            </div>
        </div>
    )
}