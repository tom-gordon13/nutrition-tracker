import { useEffect, useState } from "react"
import * as searchToDB from '../../utilities/search-to-db'
import './FoodSearchForm.css'

export default function FoodSearchForm({ setFood, setDisplayFoods, handleNewFoodItem }) {

    const [foodSearch, setFoodSearch] = useState('')





    function handleFoodSearch(evt) {
        evt.preventDefault()
        async function getFood() {
            const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            const food = await res.json()
            setFood(food)
            let newArr = food.foods.slice(0, 5)

            for (let food of newArr) {
                console.log(food)
                let newItem = ({
                    itemName: food.description,
                    fdcId: food.fdcId,
                    servingSize: `${food.servingSize}${food.servingSizeUnit}`,
                    category: food.foodCategory,
                    nutrientArr: food.foodNutrients
                })
                handleNewFoodItem(newItem)
            }
            setDisplayFoods(newArr)
            
            return food
        }
        getFood()
    }

    return (
        <div>
            <h4>Search for a food:</h4>

            <form onSubmit={handleFoodSearch}>
                <div className='form-container'>
                    <input
                        onChange={(evt) =>
                            setFoodSearch(evt.target.value)
                        }
                        value={foodSearch}
                        placeholder="Type in a food"
                        name="text"
                        required
                        pattern=".{2,}"
                        className='search-input'
                    />
                    <button className='submit-btn' type="submit">Search</button>
                </div>
            </form>
            <hr />


        </div>
    )
}