export default function FoodBucketLineItem({ item }) {
    return (
        <div className="border border-dark">
            <h4>{item.food} - {item.servingSize}</h4>
            
        </div>
    )
}