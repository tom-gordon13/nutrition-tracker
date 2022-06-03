export default function FoodTestCardNutrients({ nutrient }) {
    return (
        <div className="nutrientCard">
            <h1>{nutrient.nutrientName}</h1>
            <h5>Amount: {nutrient.value} {nutrient.unitName}</h5>
            <h5>% DV: {nutrient.percentDailyValue}.0%</h5>
        </div>
    )
}