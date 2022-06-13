import { useEffect, useState } from 'react'
import './NutritionSummary.css'
import NutrientCard from './NutrientCard'
import * as foodBucketAPI from '../../utilities/foodBuckets-api'


export default function NutritionSummary({ currDate, currBucket, displayBucketItems, bucketItems }) {
    const [bucketNutrients, setBucketNutrients] = useState(null)

    

    useEffect(function () {
        async function getBucketNutrients() {
            console.log(currBucket)
            if (currBucket) {

                let newNutrients = await foodBucketAPI.getBucketNutrients(currBucket._id, currDate)

                let obj = (new Object(newNutrients))
                
                setBucketNutrients(newNutrients)
                
            } else {
                setBucketNutrients(null)
            }
        }
        getBucketNutrients()
    }, [currBucket, displayBucketItems, currDate, bucketItems])

    return (
        <div className='card nutrient-card'>
            <div className="card-content">
                <h2>Nutrition Summary</h2>
                <h5>{currDate}</h5>

                <table className='nutrient-table'>
                    <thead className='border-bottom'>
                        <tr className='d-flex justify-content-start w-100'>
                            <th className='d-flex justify-content-start nutrient-col'>Nutrient</th>
                            <th className='d-flex justify-content-end volume-col'>Volume</th>
                            
                        </tr>
                    </thead>
                    
                    <tbody>
                        {(bucketNutrients !== null) ? Object.entries(bucketNutrients).map(([key, value], index) => <NutrientCard key={index} nutrient={key} amount={value.value} units={value.units} />) : <tr ><td> <h3 className='mt-5'>No Items Logged</h3> </td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

