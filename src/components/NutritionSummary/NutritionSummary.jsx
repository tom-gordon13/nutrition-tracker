import { useEffect, useState } from 'react'
import './NutritionSummary.css'
import NutrientCard from './NutrientCard'
import * as foodBucketAPI from '../../utilities/foodBuckets-api'


export default function NutritionSummary({ currDate, currBucket, displayBucketItems }) {
    const [bucketNutrients, setBucketNutrients] = useState(null)


    useEffect(function () {
        async function getBucketNutrients() {
            
            if (currBucket && currBucket.itemsEaten.length > 0) {
                
                let newNutrients = await foodBucketAPI.getBucketNutrients(currBucket._id, currDate)
                
                let obj = (new Object(newNutrients))
                
                setBucketNutrients(newNutrients)  
            } else {
                setBucketNutrients(null)
            }
        }
        getBucketNutrients()
    }, [currBucket, displayBucketItems, currDate])

    return (
        <div className='card nutrient-card'>
            <div className="card-content">
                <h2>Nutrition Summary</h2>
                <h5>{currDate}</h5>

                <table>
                    <thead>
                        <tr className='d-flex justify-content-start'>
                            <th width='200' className='d-flex justify-content-start'>Nutrient</th>
                            <th width='100' className='d-flex justify-content-end'>Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(bucketNutrients !== null) ? Object.entries(bucketNutrients).map(([key, value], index) => <NutrientCard key={index} nutrient={key} amount={value.value} units={value.units} />) : <tr><td> <h3>No Items Logged</h3> </td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}