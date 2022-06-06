import { useEffect, useState } from "react"
import * as searchToDB from '../../utilities/search-to-db'

export default function FoodSearchForm({ setFood, setDisplayFoods, handleNewFoodItem }) {
    
    const [foodSearch, setFoodSearch] = useState('')
    
    

    
    
    function handleFoodSearch(evt) {
        evt.preventDefault()
        async function getFood() {
            const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            const food = await res.json()
            setFood(food)
            let newArr = food.foods.slice(0,5)
            
            for (let food of newArr) {
                let newItem = ({
                    itemName: food.description,
                    fdcId: food.fdcId,
                    servingSize: `${food.servingSize}${food.servingSizeUnit}`
                })
                handleNewFoodItem(newItem);
            }
            setDisplayFoods(newArr)
            return food
        }
        getFood()
    }

    return (
        <div>
            <h1>Search for a food:</h1>
            
            <form onSubmit={handleFoodSearch}>
                <h4>New Food</h4>
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