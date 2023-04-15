const User = require('../models/User');

exports.findUser = async (filter) => {
    const user = await User.findOne(filter).populate("productsListed").populate("ordersListed") 
    console.log(user);
    return user;
}

exports.createUser = async (data) => {
    const user = await User.create(data).populate("productsListed").populate("ordersListed");
    return user;
}

exports.updateUser = async(filter,data) => {
    const user = await User.findByIdAndUpdate(filter,data,{new:true}).populate("productsListed").populate("ordersListed");
    return user;
}