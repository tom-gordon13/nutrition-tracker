import { useEffect, useState } from "react"
// import FoodTestCardNutrients from './FoodTestCardNutrients'
// import FoodTestDisplay from './FoodTestDisplay'
// import "./FoodTestPage.css"

export default function FoodSearchForm({ setFood, setDisplayFoods }) {
    
    const [foodSearch, setFoodSearch] = useState('')
    
    
    function handleFoodSearch(evt) {
        evt.preventDefault()
        async function getFood() {
            const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            const food = await res.json()
            setFood(food)
            let newArr = food.foods.slice(0,5)
            setDisplayFoods(newArr)
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
                    pattern=".{2,}"
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            

        </div>
    )
}