const mongoose = require('mongoose')


const ProductEscema = new mongoose.Schema({
    title : String  , 
    img_url :String  , 
    price : Number , 
    qyt : {
        type : Number , 
        default : 1
    } , 
    creratedAt : {
        type : Date , 
        default : Date.now
    },
    user_id : String ,
    user_img : String ,

    catogres : String  , 
   updatedAt : {
        type : Date , 
        default : Date.now
    }
})


const product = mongoose.model("product" , ProductEscema)

module.exports = product ;