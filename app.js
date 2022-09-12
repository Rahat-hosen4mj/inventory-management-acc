const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true , "Please provide a name for this product"],
    trim: true,
    unique: [true, "Name must be Unique"],
    minLength: [3,"Name must be atleast 3 character"],
    maxLength: [100,"Name is too hard"]
  },
  description:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
    min: [0, "Price can be negative"]
  },
  unit:{
    type: String,
    required: true,
    enum: {
      values: ["kg","liter","pcs"],
      message: "Unit value can't be {value}, must be kg/liter/pcs"
    }
  },
  quantity:{
    type: Number,
    required: true,
    min:[0, "Quantity can't be negative"],
    validate: {
      validator: (value) => {
        const isInteger = Number.isInteger(value);
        if(isInteger){
          return true
        }else{
          return false
        }
      }
    },
    message: "Quantity must be required"
  },
  status:{
    type: String,
    required: true,
    enum:{ 
      values: ['in-stock', 'out-of-stock', 'discontinued'],
      message: "status can't be {VALUE}"
    }
  },
  // supplier:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Supplier"
  // },
  // categories:[{
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   _id: mongoose.Schema.Types.ObjectId
  // }]

  
  // createdAt:{
  //   tyep: Date, 
  //   default: Date.now
  // },
  // updatedAt:{
  //   type: Date,
  //   default: Date.now
  // }

},{
  timestamps: true
});

// mongoose middlewares for saving data: pre/post
productSchema.pre('save', function(next){
  // console.log('Before saving data');

  if(this.quantity == 0){
    this.status = 'out-of-stock';
  }
  next()
});

// productSchema.post('save', function(doc, next){
//   console.log('after saving data');

//   next();
// });


// Schema --> model --> query

productSchema.methods.logger= function(){
  console.log(`data saved for ${this.name}`);
}
const Product = mongoose.model('Product',productSchema)

app.get("/", (req, res) => {
  res.send("Inventory Management Route is working! YaY!");
});

// posting to database
app.post('/api/v1/product', async(req, res,next) =>{
  try {
    const result = await Product.create(req.body)
    result.logger()
    // save or create
    
    // instance creation --> Do someting --> save();
  //   const product = new Product(req.body)

  //   const result = await product.save()
    
  res.status(200).json({
    status: 'success',
    message: "Data inserted successfully",
    data: result
  })
  } catch (error) {
    res.status(400).json({
      status:"failed",
      message:"Data is not inserted",
      error:error.message
    })
  }
  
})

app.get("/api/v1/product", async(req,res) =>{
  try {
    // const products = await Product.where("name").equals(/\w/).where("quantity").gt(100);
    const products = await Product.findById('631e3bafb42b173cb822605b')
    res.status(200).json({
      status:"Success",
      data: products
    })
  } catch (error) {
    res.status(200).json({
      status: "failed",
      message: "can'nt get data",
      error: error.message
    })
  }
})


module.exports = app;
