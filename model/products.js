const mongoose=require("mongoose")

const productDetails=new mongoose.Schema({
    productImage:Array,
    productName: String,
    price: Number,
    discount: String,
    stock: Number,
    category: String,
    subCategory: String,
    deliveryDate: String,
    colour: String,
    size: String,
    quantity: Number,
    description: String,
})

module.exports=mongoose.model("Products",productDetails)