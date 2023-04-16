const axios = require("axios");
const User = require('../models/User')

exports.mapNearby = async (req, res) => {
    try {
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat}%2C${req.body.long}&radius=1500&type=shop&keyword=agriculture&key=AIzaSyBtygbeWna36e0chLf0XRZjXINgjen8zAw`,
            headers: { }
          };

          let sellerId = req.body.sellerId;
          let buyerId = req.body.buyerId

          const sellerAddress = await User.findById(sellerId,{address:1});
          const buyerAddress = await User.findById(buyerId,{address:1});

          let map_poly = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${buyerAddress.address}&destination=${sellerAddress.address}&sensor=false&mode=car&key=AIzaSyBtygbeWna36e0chLf0XRZjXINgjen8zAw`)

          console.log(map_poly)
  
          let results = await axios(config)

          if(!results || !map_poly) return res.status(400).json({
            message:"Error"
          })

          return res.status(200).json({
            message:"Map Data",
            data:{
                polyline: map_poly.data.routes[0].overview_polyline,
                nearby: results.data.results
            }
          })
        
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };