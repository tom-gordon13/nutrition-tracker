export default function NutrientCard({ nutrient, amount, units }) {
    return (
        <tr className='d-flex justify-content-start px-2'>
            

            <td><span className='text-left'>{nutrient}</span></td>
            <td><span>Value: {amount.toFixed(1)}{units}</span></td>
            
        </tr>
    )
}