import './NutritionSummary.css'

export default function NutrientCard({ nutrient, amount, units }) {
    return (
        <tr className='d-flex justify-content-start'>
            

            <td className='d-flex justify-content-start nutrient-col'>{nutrient}</td>
            <td className='d-flex justify-content-end volume-col'>{amount.toFixed(1)}{units}</td>
            <td className='d-flex justify-content-end perc-col'>11%</td>
            
        </tr>
    )
}