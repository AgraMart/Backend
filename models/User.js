const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    phone:{
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
    },
    gender:{
        type:String,
        enum : ['Male','Female','Others']
    },
    aadhar:{
        type:String
    },
    dob:{
        type:String
    },
    address:{
      type:String  
    },
    userType:{
        type: String,
        enum : ['Buyer','Seller'],
        required: true
    },
    productsListed:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    ordersListed:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    isFirstTime:{
        type:Boolean,
        default:true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)