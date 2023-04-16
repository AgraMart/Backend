const User = require('../models/User');

exports.findUser = async (filter) => {
    const user = await User.findOne(filter).populate("productsListed").populate({
        path: "ordersListed",
        populate: [{
            path: "itemId",
            model: "Item"
        }]
    }) 
    console.log(user);
    return user;
}

exports.createUser = async (data) => {
    const user = await User.create(data);
    return user;
}

exports.updateUser = async(filter,data) => {
    const user = await User.findByIdAndUpdate(filter,data,{new:true}).populate("productsListed").populate("ordersListed").populate({
        path: "ordersListed",
        populate: [{
            path: "itemId",
            model: "Item"
        }]
    });
    return user;
}