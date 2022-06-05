import { useEffect, useState } from "react"
import FoodSearchForm from "../../components/FoodSearchForm/FoodSearchForm"
import FoodSearchDisplay from '../../components/FoodSearchDisplay/FoodSearchDisplay'
import Placeholder from '../../components/Placeholder'
import FoodBucket from '../../components/FoodBucket/FoodBucket'
import * as foodItemsAPI from '../../utilities/foodItems-api'

export default function DayViewPage() {
    const [food, setFood] = useState({})

    const [displayFoods, setDisplayFoods] = useState([])

    async function handleNewFoodItem(foodItem) {
        const food = await foodItemsAPI.addFoodItem(foodItem)
    }    

    return (
        <div className="row">
            
            <div className="row">
                <div className="col-3">

                    <FoodSearchForm 
                    setFood={setFood} 
                    setDisplayFoods={setDisplayFoods} 
                    handleNewFoodItem={handleNewFoodItem} 
                    />

                    {displayFoods ? displayFoods.map((food, idx) =>
                        <FoodSearchDisplay food={food} />) : <h2>No Foods Selected</h2>}
                </div>
                <div className="col-6">

                    <FoodBucket />
                </div>
                <div className="col-3">

                    <Placeholder />
                </div>
            </div>
        </div>
    )
}