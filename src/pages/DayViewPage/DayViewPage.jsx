import { useEffect, useState } from "react"
import FoodSearchForm from "../../components/FoodSearchForm/FoodSearchForm"
import FoodSearchDisplay from '../../components/FoodSearchDisplay/FoodSearchDisplay'
import Placeholder from '../../components/Placeholder'
import FoodBucketHeader from '../../components/FoodBucket/FoodBucketHeader'
import * as foodItemsAPI from '../../utilities/foodItems-api'
import * as foodBucketsAPI from '../../utilities/foodBuckets-api'
import { useDrop, useDrag } from 'react-dnd'
import FoodBucketLineItem from '../../components/FoodBucket/FoodBucketLineItem'
import DishDisplay from '../../components/DishDisplay/DishDisplay'
import NutritionSummary from '../../components/NutritionSummary/NutritionSummary'
import './DayViewPage.css'


export default function DayViewPage() {
    let disabled = 'disabled'



    const [food, setFood] = useState({})
    const [currDate, setCurrDate] = useState(new Date().toISOString().split('T')[0])
    const [displayFoods, setDisplayFoods] = useState([])
    const [currentMeal, setCurrentMeal] = useState('Breakfast')
    const [bucketItems, setBucketItems] = useState([])
    const [displayBucketItems, setDisplayBucketItems] = useState([])
    const [currBucket, setCurrBucket] = useState(null)
    const [searchResults, setSearchResults] = useState(0)

    async function handleNewFoodItem(foodItem) {
        const food = await foodItemsAPI.addFoodItem(foodItem)
    }


    useEffect(function () {

        let newCurrBucket;

        async function getCurrBucket(currDate) {
            newCurrBucket = await foodBucketsAPI.getCurrBucket(currDate);
            if (newCurrBucket === null) {
                newCurrBucket = await foodBucketsAPI.createFoodBucket(currDate);
            }
            setCurrBucket(newCurrBucket)

            let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, newCurrBucket.date);
            setDisplayBucketItems(currMealItems)
        }

        async function createFoodBucket() {
            if (newCurrBucket === null) {

                let bucket = await foodBucketsAPI.createFoodBucket(currDate);
                setCurrBucket(bucket);
            }
        }
        createFoodBucket()
        getCurrBucket(currDate)
    }, [currDate])

    async function changeDate(direction) {
        let tempDate;
        let newCurrBucket;
        if (direction === '<') {
            tempDate = new Date(currDate)
            tempDate.setDate(tempDate.getDate() - 1)
            tempDate = tempDate.toISOString().split('T')[0];
            setCurrDate(tempDate)
        }

        if (direction === '>') {
            tempDate = new Date(currDate)
            tempDate.setDate(tempDate.getDate() + 1)
            tempDate = tempDate.toISOString().split('T')[0];
            setCurrDate(tempDate)
        }

        async function getCurrBucket(tempDate) {
            let newCurrBucket = await foodBucketsAPI.getCurrBucket(tempDate);
            setCurrBucket(newCurrBucket)
        }

        if (currBucket) getCurrBucket(tempDate)
        async function createFoodBucket() {
            if (newCurrBucket === null) {

                let bucket = await foodBucketsAPI.createFoodBucket(currDate);
                setCurrBucket(bucket);
            }
        }
        createFoodBucket()
    }


    useEffect(function () {

        async function updateBucketDisplay() {
            let newCurrBucket = await foodBucketsAPI.getCurrBucket(currDate);
            let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, newCurrBucket.date);

            setDisplayBucketItems(currMealItems)

        }

        if (currBucket !== null) updateBucketDisplay();
    }, [currentMeal, currBucket])


    useEffect(function () {

        async function addItemToBucket() {
            let tempItem = await bucketItems[bucketItems.length - 1]
            let lineItem = await foodBucketsAPI.addItemToBucket(tempItem, currentMeal, currBucket);
            let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, currDate);
            setDisplayBucketItems([...currMealItems])
        }
        if (currBucket) addItemToBucket();
    }, [bucketItems])


    async function deleteBucketItem(idx) {
        let updatedBucketRaw = await foodBucketsAPI.deleteBucketItem(currBucket._id, currentMeal, idx, currBucket.date);

        let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, updatedBucketRaw.date);
        setDisplayBucketItems(currMealItems)
    }

    const [{ isOver }, dropRef] = useDrop({
        accept: 'foodItem',
        drop: (item) => setBucketItems([...bucketItems, item]),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })


    async function handleSearchToggle(evt) {
        let move;
        evt.target.innerText === 'Next' ? move = searchResults + 3 : move = searchResults - 3
        setSearchResults(move)
    }




    return (
        <div className="row d-flex justify-content-center w-100">
            {/* LEFTHAND PANEL - FOOD SEARCH & FOOD SEARCH DISPLAY & DISHES DISPLAY*/}
            <div className="col-2 lefthand-panel">

                <FoodSearchForm
                    setFood={setFood}
                    setDisplayFoods={setDisplayFoods}
                    handleNewFoodItem={handleNewFoodItem}
                    searchResults={searchResults}
                />

                {displayFoods ? displayFoods.slice(searchResults, parseInt(searchResults) + 3).map((food, idx) =>
                    <FoodSearchDisplay
                        food={food}
                        key={idx}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        draggable />) : <h2>No Foods Selected</h2>}

                <div>
                    <button {... !searchResults ? { disabled } : {}} onClick={handleSearchToggle}>Prev</button>
                    <button {... (searchResults === 12 || displayFoods.length === 0) ? { disabled } : {}} onClick={handleSearchToggle} >Next</button>
                    {displayFoods.length > 0 ? <p>Displaying Results {searchResults + 1} - {searchResults + 3} of 15</p> : ''}
                    {displayFoods.length > 0 ? <h6>Once you find the item you ate, drag it to the box in the center!</h6> : ''}
                </div>

            </div>

            {/* MIDDLE PANEL - FOOD BUCKET & CURRENT SELECTED MEAL */}
            <div className="col-2 d-flex justify-content-center flex-wrap center-panel">

                <FoodBucketHeader currentMeal={currentMeal} setCurrentMeal={setCurrentMeal} currBucket={currBucket} currDate={currDate} changeDate={changeDate} />
                <div className='foodBucket border border-dark overflow-auto h50 w-75 shadow p-3 mb-5 bg-white rounded' ref={dropRef}>
                    {displayBucketItems.map((item, idx) =>
                        <FoodBucketLineItem
                            item={item}
                            key={idx}
                            idx={idx}
                            deleteBucketItem={deleteBucketItem} />)}
                    {isOver && <div>drop here!</div>}
                </div>
            </div>

            {/* RIGHTHAND PANEL - DAILY NUTRITION SUMMARY */}
            <div className="col-3 right-panel">
                <NutritionSummary currDate={currDate} currBucket={currBucket} displayBucketItems={displayBucketItems} bucketItems={bucketItems} />
            </div>
        </div>


    )
}