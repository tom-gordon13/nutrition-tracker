export default function FoodBucketLineItem({ item }) {
    return (
        <div className="border border-dark">
            <h4>Food: {item.itemName}</h4>
            <h4>Food: {item.fdcId}</h4>
            
        </div>
    )
}