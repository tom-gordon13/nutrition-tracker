import './FoodBucket.css'

export default function FoodBucketLineItem({ item, idx, deleteBucketItem }) {
    function handleDeleteItem() {
        deleteBucketItem(idx)
    }

    let newSS = item.foodRef.servingSize.replace('undefined', '')

    return (

        <div className="border border-dark d-flex row food-card">
            <div className="col justify-self-start d-flex justify-content-start flex-column align-items-start gap-0">
                <h5 className='mb-0'><b>Food:</b> {item.itemName}</h5>
                <span><b>Category:</b> {item.foodRef.category}</span>
                
                <span><b>Brand Name:</b> {item.foodRef.brandName}</span>
                
                <span><b>Serving Size:</b> {newSS ? newSS : 'N/A'}</span>
            </div>
            <div className="col-2 d-flex align-items-center">
                <img src="trash-can-solid" alt="" />
                <button className='del-btn bg-danger' onClick={handleDeleteItem}><img src="trash-can-solid.svg" alt="" className='bg-danger'/></button>
            </div>
        </div>
    )
}