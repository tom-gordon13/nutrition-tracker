import { useEffect, useState } from "react"
import * as searchToDB from '../../utilities/search-to-db'
import './FoodSearchForm.css'

export default function FoodSearchForm({ setFood, setDisplayFoods, handleNewFoodItem }) {
    const checked = 'checked'
    const [foodSearch, setFoodSearch] = useState('')
    const [brandedFilter, setBrandedFilter] = useState(false)
    const [genericFilter, setGenericFilter] = useState(false)
    
    async function handleCheck(evt) {
        let newBranded = brandedFilter
        let newGeneric = genericFilter
        
        if (brandedFilter !== genericFilter) {
            newBranded = !brandedFilter
            newGeneric = !genericFilter
        }

        evt.target.value === 'branded' ? newBranded = !brandedFilter : newGeneric = !genericFilter
        
        setBrandedFilter(newBranded)
        setGenericFilter(newGeneric)
    }


    function handleFoodSearch(evt) {
        evt.preventDefault()
        async function getFood() {
            let res = ''
            if (!brandedFilter) res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            if (brandedFilter) res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&dataType=Branded&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            if (genericFilter) res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodSearch}&pageSize=5&dataType=Foundation&api_key=t9Qh8VynOX436ctBiag5DelokknU3pxcDFpdcO8d`)
            const food = await res.json()
            setFood(food)
            let newArr = food.foods.slice(0, 5)

            for (let food of newArr) {
                let newItem = ({
                    itemName: food.description,
                    fdcId: food.fdcId,
                    servingSize: `${food.servingSize}${food.servingSizeUnit}`,
                    category: food.foodCategory,
                    nutrientArr: food.foodNutrients,
                    brandName: food.brandName,
                    brandOwner: food.brandOwner,
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
            <span>Include Only Branded Items: </span><input type="checkbox" id="html" name="branded" value="branded" onChange={handleCheck} {...(brandedFilter && { checked })} />
            <br />
            <span>Include Only Generic Items: </span><input type="checkbox" id="html" name="generic" value="generic" onChange={handleCheck} {...(genericFilter && { checked })} />
                
                <hr />


        </div>
    )
}