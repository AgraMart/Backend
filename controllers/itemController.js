const axios = require("axios");
const userService = require('../services/userService');
const itemService = require('../services/itemService');

exports.newItem = async (req, res) => {
    try {
        const {name,price,quantity,mfd,expiry,description,productType} = req.body;
        if(!name || !price || !quantity || !mfd || !description || !productType){
            return res.status(400).json({
                message:"Essential fields missing"
            })
        }

        const user = req.user;
        const data = req.body;
        data.sellerId = user._id;
        let item = await itemService.createItem(data);
        console.log(item)
        
        if(item){
            await userService.updateUser(user.id,{ $push: { productsListed: item  } });
            return res.status(200).json({
                message:"Item created",
                data:item
            })
        }
        
        
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };

exports.editItem = async(req,res) => {
    try {
        const {data} = req.body;

        let item = await itemService.updateItem(data.id,data);
        console.log(item)

        return res.status(200).json({
            message:"Item Updated",
            data:item
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteItem = async(req,res) => {
    try {
        const {id} = req.params;

         const item = await itemService.deleteItem(id);
         const user = req.user;
    
         console.log(item);

         await userService.updateUser(user.id,{ $pull: { productsListed: item._id  } });

        return res.status(200).json({
            message:"Item Deleted",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.showAllItems = async(req,res) => {
    try {
        const items = await itemService.allItems();

        return res.status(200).json({
            message:"Items",
            data:items
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}