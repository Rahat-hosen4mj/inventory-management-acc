const mongoose = require('mongoose')

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
  
  // mongoose middleware pre/ post
  productSchema.pre('save', function(next){
    if(this.quantity == 0){
        this.status = 'out-of-stock'
      }
    next()
  })
  // productSchema.post('save', function(doc, next){
  //   console.log(`after saving data`);
  //   next()
  // })
  
  // create mongoose instance
  productSchema.methods.blogger = function(){
    console.log(`Data is save for ${this.name}`);
  }
  
  
  // SCHEMA -->  MODEL --> QUERY
  const Product = mongoose.model("Product", productSchema);

module.exports = Product;