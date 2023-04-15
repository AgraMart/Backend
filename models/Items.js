const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    mfd:{
        type:String,
        require:true
    },
    expiry:{
        type:String
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    productType:{
        type:String,
        require:true,
        enum:["Seeds","Fertilizers","Gears","Tools"]
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Item', ItemSchema)