const Product = require('../models/Product')
const {getProductService, createProductService} = require('../services/product.services')

exports.getProduct = async(req, res) =>{
    try {
     const products = await getProductService()
     res.status(200).send({
       status: "Success",
       message: "Data get Successfully",
       data: products
     })
    } catch (error) {
       res.status(400).send({
         status: "Failed",
         message: "Can't get Data",
         error: error.message
       })
    }
}

exports.createProduct =  async(req, res) =>{
    try {
      // const product = new Product(req.body);
      // if(product.quantity == 0){
      //   product.status = 'out-of-stock'
      // }
      // const result = await product.save()
  
      const result = await createProductService(req.body);
      res.status(200).send({
        status: "Success",
        message: "Data Inserted succesfully",
        data: result
      })
    } catch (error) {
      res.status(400).send({
        status: "Failed",
        message: "Failed to inserted data",
        error: error.message
      })
    }
  }