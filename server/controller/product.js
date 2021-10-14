const { json } = require('body-parser');
const mongoose = require('mongoose');
const Product = require("../models/products")
const faker = require("faker")


exports.getProduct = (req, res) =>{
const products = Product.find({}, function (err, doc) {
  res.json(doc)
})
}

exports.getOneProduct = (req, res) =>{
  
const products = Product.findById(req.params.id , function (err, doc) {
  res.json(doc)
})
}
exports.create = (req, res) => {
     console.log(req.body , req.file)
    const ProductrData = new Product({
      title :     req.body.title,
      img_url :   req.file.filename,
      price :     req.body.price , 
      catogres : req.body.catogres , 
      user_id :  req.body.user_id  ,
      user_img :  req.body.user_img 
    });
  
    // // Save Tutorial in the database
    
    ProductrData.save()
    .then(data => {
      return res.json(data)
      })
      .catch(err => {
       console.log(err)
      });

    
      // Create a Tutorial
};

exports.deleteOneProduct = (req,res)=>{

  return products = Product.findByIdAndDelete(req.params.id , function (err, doc) {
    res.json({'deleted' : true })
  })
}