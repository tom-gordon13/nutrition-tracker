import { useEffect, useState } from 'react'
import './NutritionSummary.css'
import NutrientCard from './NutrientCard'
import * as foodBucketAPI from '../../utilities/foodBuckets-api'


export default function NutritionSummary({ currDate, currBucket, displayBucketItems }) {
    const [bucketNutrients, setBucketNutrients] = useState(null)


    useEffect(function () {
        async function getBucketNutrients() {
            
            if (currBucket) {
                let newNutrients = await foodBucketAPI.getBucketNutrients(currBucket._id, currDate)
                setBucketNutrients(newNutrients)

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
                        {(bucketNutrients !== null) ? Object.entries(bucketNutrients).map(([key, value], index) => <NutrientCard key={index} nutrient={key} amount={value.value} units={value.units} />) : <tr><td>...</td></tr>}
                    </tbody>
                </table>
                {/* <div className="border border-dark overflow-auto h50 w-75 p-0">
                    {(bucketNutrients !== null) ? Object.entries(bucketNutrients).map(([key, value]) => <NutrientCard nutrient={key} amount={value.value} units={value.units} />) : <h1>...</h1>}
                    
                </div> */}


            </div>
        </div>
    )
}