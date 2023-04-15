const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");


exports.currentWeather = async (req, res) => {
    try {
        const lat = req.body.lat;
        const long = req.body.long;

        if(!lat && !long) return res.status(400).json({message:"Lat and long required"})

        const results = await axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&timezone=auto`)


        if(results)  return res.status(200).json({data: results.data.current_weather});

        return res.status(400).json({
            message:"Error occured"
        }) 
        
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };

exports.news = async(req,res) => {
  try {
    const results = await axios
        .get(`https://api.newscatcherapi.com/v2/search?q=Agriculture&countries=IN&page_size=15`,{
          headers:{
            "x-api-key" : "xDdxzVK_aRtvqU_ePMSOlnEcLTtfWR-pxgj7kMUrCmc"
          }
        })

        console.log(results);


        if(results)  return res.status(200).json({data: results.data.articles});

        return res.status(400).json({
            message:"Error occured"
        }) 
  } catch (error) {
    console.log(error);
      res.status(500).send("Server Error");
  }
}

exports.chat = async(req,res) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
              ${prompt}
            `,
      max_tokens: 64,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });

  } catch (error) {
    console.log(error);
      res.status(500).send("Server Error");
  }
}