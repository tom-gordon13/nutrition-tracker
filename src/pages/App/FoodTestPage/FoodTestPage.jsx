import { useEffect, useState } from "react"
import FoodTestCardNutrients from './FoodTestCardNutrients'
import FoodTestDisplay from './FoodTestDisplay'
import "./FoodTestPage.css"

export default function FoodTestPage() {
    const [food, setFood] = useState({})
    const [foodSearch, setFoodSearch] = useState('')

    // useEffect(function () {
    //     async function getFood() {
    //         const res = await fetch('https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d')
    //         const food = await res.json()
    //         setFood(food)
    //         return food
    //     }
    //     getFood()
    // }, [])
    console.log(food)
    function handleFoodSearch(evt) {
        evt.preventDefault()
        async function getFood() {
            const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=2&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            const food = await res.json()
            setFood(food)
            console.log(res)
            return food
        }
        getFood()
    }

    return (
        <div>
            <h1>Food Test</h1>
            
            <form onSubmit={handleFoodSearch}>
                <h2>New Food</h2>
                <input
                    onChange={(evt) =>
                        setFoodSearch(evt.target.value)
                    }
                    value={foodSearch}
                    placeholder="Type in a food"
                    name="text"
                    required
                    pattern=".{4,}"
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            {food.foods ?  <FoodTestDisplay food={food}/> : <h3>No Food Selected</h3>}

        </div>
    )
}