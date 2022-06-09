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

                <table className='nutrient-table'>
                    <thead>
                        <tr className='d-flex justify-content-start w-100'>
                            <th className='d-flex justify-content-start nutrient-col'>Nutrient</th>
                            <th className='d-flex justify-content-end volume-col'>Volume</th>
                            <th className='d-flex justify-content-end perc-col'>% of RDI</th>
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










// Protein: { value: 20.119999999999997, units: 'G' }
// Total lipid(fat): { value: 13.3, units: 'G' }
// Fatty acids, total saturated: { value: 5.32, units: 'G' }
// Fatty acids, total trans: { value: 0, units: 'G' }
// Sodium, Na: { value: 916, units: 'MG' }
// Sugars, total including NLEA: { value: 18.87, units: 'G' }
// Iron, Fe: { value: 8.530000000000001, units: 'MG' }
// Calcium, Ca: { value: 157, units: 'MG' }
// Fiber, total dietary: { value: 6.6, units: 'G' }
// Potassium, K: { value: 447, units: 'MG' }
// Vitamin A, IU: { value: 15500, units: 'IU' }
// Vitamin B - 6: { value: 0.265, units: 'MG' }
// Vitamin C, total ascorbic acid: { value: 123.4, units: 'MG' }
// Vitamin K(phylloquinone): { value: 828, units: 'UG' }