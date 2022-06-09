export default function FoodBucketLineItem({ item, idx, deleteBucketItem }) {
    function handleDeleteItem() {
        deleteBucketItem(idx)
    }

    let newSS = item.foodRef.servingSize.replace('undefined', '')

    return (

        <div className="border border-dark d-flex row">
            <div className="col justify-self-start d-flex justify-content-start flex-column align-items-start gap-0">
                <h5><b>Food:</b> {item.itemName}</h5>
                <span><b>Category:</b> {item.foodRef.category}</span>
                
                <span><b>Brand Name:</b> {item.foodRef.brandName}</span>
                
                <span><b>Serving Size:</b> {newSS ? newSS : 'N/A'}</span>
            </div>
            <div className="col-3 d-flex align-items-center">
                <button className='bg-danger' onClick={handleDeleteItem}>Delete Item</button>
            </div>
        </div>
    )
}