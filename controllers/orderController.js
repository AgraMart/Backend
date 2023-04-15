const orderService = require('../services/orderService')
const userService = require('../services/userService');
const itemService = require('../services/itemService');
const Order = require('../models/Order')

exports.createOrder = async(req,res) => {
    try {
      const {data} = req.body;
      data.buyerId = req.user._id;
      const user = req.user;

   
      var QRCode = require('qrcode')

        

        const qr = await QRCode.toDataURL(`https://jovial-gingersnap-f0ab3c.netlify.app/`)

        data.qrcode = qr

        data.deliveryID = Math.round(Math.random() * 1000000);

      const order = await orderService.createOrder(data);
      if(!order){
        return res.status(400).json({
            message:"Error in order creation"
        })
      }  

      await userService.updateUser(user.id,{ $push: { ordersListed: order  } });
      await itemService.updateItem(data.itemId,{$inc:{quantity: -data.quantity}})
      
      res.status(200).json({
        message:"Order generated",
        data: order
      })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.updateDelivery = async(req,res) => {
    try {
        const {id,delivery} = req.body;
        const order = await orderService.findOrder(id);
        if(order){
            if(order.deliveryID == delivery){
                await orderService.updateOrder(id,{status:"Delivered"})
                return res.status(200).json({
                    message:"Order received"
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}

exports.mySales = async(req,res) => {
    try {
        const user = req.user;
        const data = await Order.find({sellerId: user.id}).populate("itemId");
        return res.status(200).json({
            message:"Sales Data",
            data:data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
}