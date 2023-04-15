const Item = require('../models/Items');

exports.allItems = async (filter) => {
    const items = Item.find({});
    return items;
}

exports.createItem = async (data) => {
    const item = await Item.create(data);
    return item;
}

exports.updateItem = async(filter,data) => {
    const item = await Item.findByIdAndUpdate(filter,data,{new:true});
    return item;
}

exports.deleteItem = async(data) => {
    const item = await Item.findOneAndDelete({id:data});
    return item;
}