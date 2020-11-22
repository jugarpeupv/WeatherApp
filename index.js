const { static, json } = require('express');
const express = require('express');
require('dotenv').config();

const fetch = require('node-fetch');
const app = express();

app.listen(process.env.PORT, ()=>{
    console.log(`App listening on port ${process.env.PORT}`);
})

app.use(express.static('public'));
app.use(express.json())

// Get the weather by lat and long
app.post('/api', async (req, res)=>{
    const {lat, long} = req.body
    const weatherurl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`
    const response = await fetch(weatherurl)
    const responsejson = await response.json();
    res.send(responsejson)
    console.log(responsejson)

})

// Get the weather by city
app.get('/weather/:city', async (req,res)=>{
    console.log(req.params.city)
    const city = req.params.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
    const response = await fetch(url);
    const responsedata = await response.json()
    res.send(responsedata);
    console.log(responsedata);
})

