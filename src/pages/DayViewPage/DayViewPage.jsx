import { useEffect, useState } from "react"
import FoodSearchForm from "../../components/FoodSearchForm/FoodSearchForm"
import FoodSearchDisplay from '../../components/FoodSearchDisplay/FoodSearchDisplay'
import Placeholder from '../../components/Placeholder'

export default function DayViewPage() {
    const [food, setFood] = useState({})

    const [displayFoods, setDisplayFoods] = useState([])

    

    return (
        <div className="row">
            <h1>Day Page View</h1>
            <div className="row">
                <div className="col-3">

                    <FoodSearchForm setFood={setFood} setDisplayFoods={setDisplayFoods} />
                    {displayFoods ? displayFoods.map((food, idx) =>
                        <FoodSearchDisplay food={food} />) : <h2>No Foods Selected</h2>}
                </div>
                <div className="col-6">

                    <Placeholder />
                </div>
                <div className="col-3">

                    <Placeholder />
                </div>
            </div>
        </div>
    )
}