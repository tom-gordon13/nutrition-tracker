export default function NutrientCard({ nutrient, amount, units }) {
    return (
        <tr className='d-flex justify-content-start'>
            

            <td width='200' className='d-flex justify-content-start'>{nutrient}</td>
            <td width='100' className='d-flex justify-content-end'>{amount.toFixed(1)}{units}</td>
            
        </tr>
    )
}