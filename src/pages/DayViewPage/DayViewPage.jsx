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
import './DayViewPage.css'


export default function DayViewPage() {
    let falseDate = new Date('2000-1-1')
    
    let emptyBucket = {
        date: new Date('2000-1-1').toISOString().split('T')[0],
        // user: 
        itemsEaten: []
    }


    const [food, setFood] = useState({})
    const [currDate, setCurrDate] = useState(new Date().toISOString().split('T')[0])
    const [displayFoods, setDisplayFoods] = useState([])
    const [currentMeal, setCurrentMeal] = useState('Breakfast')
    const [bucketItems, setBucketItems] = useState([])
    const [displayBucketItems, setDisplayBucketItems] = useState([])
    const [currBucket, setCurrBucket] = useState(null)

    async function handleNewFoodItem(foodItem) {
        const food = await foodItemsAPI.addFoodItem(foodItem)
    }


    useEffect(function() {
        
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
        if (direction === '<') {
            tempDate = new Date(currDate)
            tempDate.setDate(tempDate.getDate()-1)
            tempDate = tempDate.toISOString().split('T')[0];
            setCurrDate(tempDate)
        }
        
        if (direction === '>') {
            tempDate = new Date(currDate)
            tempDate.setDate(tempDate.getDate()+1)
            tempDate = tempDate.toISOString().split('T')[0];
            setCurrDate(tempDate)
        }
        
        async function getCurrBucket(tempDate) {
            let newCurrBucket = await foodBucketsAPI.getCurrBucket(tempDate);
            setCurrBucket(newCurrBucket)
        }
        if (currBucket) getCurrBucket(tempDate)

    }
    

    useEffect(function() {
        
        async function updateBucketDisplay() {
            let newCurrBucket = await foodBucketsAPI.getCurrBucket(currDate);
            let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, newCurrBucket.date);
            
            setDisplayBucketItems(currMealItems)
            
        }

        if (currBucket !== null) updateBucketDisplay();
    }, [currentMeal, currBucket])


    useEffect(function() {

        async function addItemToBucket() {
            let tempItem = await bucketItems[bucketItems.length - 1]
            let lineItem = await foodBucketsAPI.addItemToBucket(tempItem, currentMeal, currBucket);
            let currMealItems = await foodBucketsAPI.getCurrMealItems(currentMeal, currDate);
            setDisplayBucketItems([...currMealItems])
        }
        if (currBucket)  addItemToBucket();
    }, [bucketItems])


    async function deleteBucketItem(idx) {
        let updatedBucketRaw = await foodBucketsAPI.deleteBucketItem(currBucket._id, currentMeal, idx, currBucket.date);
        let updatedBucketItems = updatedBucketRaw.itemsEaten.filter(item => item.meal === currentMeal)
        setDisplayBucketItems(updatedBucketItems)
    }

    const [{ isOver }, dropRef] = useDrop({
        accept: 'foodItem',
        drop: (item) => setBucketItems([...bucketItems, item]),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
            <div className="row">

                <div className="row">
                    {/* LEFTHAND PANEL - FOOD SEARCH & FOOD SEARCH DISPLAY & DISHES DISPLAY*/}
                    <div className="col-3">

                        <FoodSearchForm
                            setFood={setFood}
                            setDisplayFoods={setDisplayFoods}
                            handleNewFoodItem={handleNewFoodItem}
                        />

                        {displayFoods ? displayFoods.map((food, idx) =>
                            <FoodSearchDisplay food={food} key={idx} draggable />) : <h2>No Foods Selected</h2>}
                        
                        <div>
                            <button>Prev</button>
                            <button>Next</button>
                        </div>

                        <hr />
                        
                        <DishDisplay />
                    </div>

                    {/* MIDDLE PANEL - FOOD BUCKET & CURRENT SELECTED MEAL */}
                    <div className="col-6 d-flex justify-content-center flex-wrap">
                        
                        <FoodBucketHeader currentMeal={currentMeal} setCurrentMeal={setCurrentMeal} currBucket={currBucket} currDate={currDate} changeDate={changeDate}/>
                        <div className='foodBucket border border-dark overflow-auto h50 w-75' ref={dropRef}>
                            {displayBucketItems.map((item, idx) =>
                                <FoodBucketLineItem item={item} key={idx} idx={idx} deleteBucketItem={deleteBucketItem} />)}
                            {isOver && <div>drop here!</div>}    
                        </div>
                    </div>

                    {/* RIGHTHAND PANEL - DAILY NUTRITION SUMMARY */}
                    <div className="col-3">
                        <Placeholder />
                    </div>
                </div>
            </div>
        
    )
}