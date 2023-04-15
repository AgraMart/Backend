const axios = require("axios");

exports.mapNearby = async (req, res) => {
    try {
        var config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat}%2C${req.body.long}&radius=1500&type=shop&keyword=agriculture&key=AIzaSyBtygbeWna36e0chLf0XRZjXINgjen8zAw`,
            headers: { }
          };

          
  
          axios(config)
          .then(function (response) {
            return res.status(200).json({
                message:"Map output",
                data: response.data.results
            })
          })
          .catch(function (error) {
            console.log(error);
            res.status(500).send("Server Error");
          });
        
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };