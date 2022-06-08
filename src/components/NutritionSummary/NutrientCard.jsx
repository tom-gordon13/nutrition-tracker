export default function NutrientCard({ nutrient, amount, units }) {
    return (
        <div>
            <p>Nutrient: {nutrient}</p>
            <p>Value: {amount}{units}</p>
        </div>
    )
}