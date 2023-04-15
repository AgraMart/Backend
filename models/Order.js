const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    itemId:{
        type: Schema.Types.ObjectId,
        ref: 'Item',
        require:true
    },
    buyerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    sellerId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    status:{
        type:String,
        enum:["On the Way","Delivered","Cancelled"],
        default:"On the Way",
        require:true
    },
    qrcode:{
        type:String,
        require:true
    },
    deliveryID:{
        type:Number,
        require:true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)