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


export default function DayViewPage() {
    let falseDate = new Date('2000-1-1')
    
    let emptyBucket = {
        date: new Date('2000-1-1'),
        // user: 
        itemsEaten: []
    }
    
    const [food, setFood] = useState({})

    const [displayFoods, setDisplayFoods] = useState([])
    const [currentMeal, setCurrentMeal] = useState('Breakfast')
    const [bucketItems, setBucketItems] = useState([])
    const [currBucket, setCurrBucket] = useState(emptyBucket)

    async function handleNewFoodItem(foodItem) {
        const food = await foodItemsAPI.addFoodItem(foodItem)
    }

    useEffect(function() {
        

        async function createFoodBucket() {
            if (currBucket.date.getYear === falseDate.getYear) {
                
                let bucket = await foodBucketsAPI.createFoodBucket();
                setCurrBucket(bucket);
            }
        }

        async function addItemToBucket() {
            let tempItem = await bucketItems[bucketItems.length - 1]
            let lineItem = await foodBucketsAPI.addItemToBucket(tempItem, currentMeal);
            
        }
        
        createFoodBucket();
        addItemToBucket();
    }, [bucketItems])



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
                    <div className="col-6">
                        
                        <FoodBucketHeader currentMeal={currentMeal} setCurrentMeal={setCurrentMeal}/>
                        <div className='foodBucket border border-dark' ref={dropRef}>
                            {bucketItems.map((item, idx) =>
                                <FoodBucketLineItem item={item} key={idx} />)}
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