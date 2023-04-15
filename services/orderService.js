const Order = require('../models/Order');

exports.createOrder = async (data) => {
    const order = (await (await Order.create(data)).populate("sellerId")).populate("itemId");
    return order;
}

exports.findOrder = async(id) =>{
    const order = await Order.findById(id); 
    return order;
}

exports.updateOrder = async(filter,data) => {
    const order = await Order.findByIdAndUpdate(filter,data,{new:true});
    return order;
}