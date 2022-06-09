export default function FoodBucketLineItem({ item, idx, deleteBucketItem }) {
    function handleDeleteItem() {
        deleteBucketItem(idx)
    }
    
    return (

        <div className="border border-dark d-flex row">
            <div className="justify-self-start col">
                <h4>Food: {item.itemName}</h4>
                
                <h6>Category: {item.foodRef.category}</h6>
                <h6>Brand Name: {item.foodRef.brandName}</h6>
                
            </div>
            <div className="col">
                <h4>Quantity: 1</h4>
                <button className='bg-danger' onClick={handleDeleteItem}>Delete Item</button>
            </div>
        </div>

    )
}