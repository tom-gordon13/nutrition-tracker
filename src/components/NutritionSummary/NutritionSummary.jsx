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
                console.log(newNutrients)
            }

        }
        getBucketNutrients()
    }, [currBucket, displayBucketItems])



    return (
        <div className='card nutrient-card'>
            <div className="card-content">
                <h2>Nutrition Summary</h2>
                {/* <h5>{currDate}</h5> */}
                <div className="border border-dark overflow-auto h50 w-75">
                    {(bucketNutrients !== null) ? Object.entries(bucketNutrients).map(([key, value]) => <NutrientCard nutrient={key} amount={value.value} units={value.units} />) : <h1>hi</h1>}
                    {/* {Object.entries(bucketNutrients).map(([key, value]) => <NutrientCard nutrient={key} value={value[0]} units={value[1]} />)} */}
                </div>


            </div>
        </div>
    )
}