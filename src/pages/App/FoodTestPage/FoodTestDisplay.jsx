import FoodTestCardNutrients from './FoodTestCardNutrients'

export default function FoodTestDisplay({ food }) {
    return (
        <div>
        <h2>Test</h2>
        <h3>Food: {food.foods[0].description}</h3>
            <h3>Serving Size: {food.foods[0].servingSize}{food.foods[0].servingSizeUnit}</h3>
            {food.foods[0].foodNutrients.map(nutrient =>
                <FoodTestCardNutrients nutrient={nutrient} />)}
        </div>
    )
}