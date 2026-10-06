require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 5000;
const API_KEY = process.env.OPEN_WEATHER_API_KEY;

//const frontendPath = path.join(__dirname, '..', 'frontend')
//app.use(express.static(frontendPath));

app.use(cors());
app.use(express.json());

if(!API_KEY){
    console.error("please provide API key")
    process.exit(1)
}

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.json({ message: 'City is required' })
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url)
        const data = await response.json()

        console.log(data)
        res.json(data)

        if(weatherURl.status === 404){
           return res.status(404).json({message: `${city} not found`})
        }

       if(!weatherURl.ok){
            return res.status(502).json({error: `Server is down`})
        }


        res.json({
            city: data.name,
            country:data.sys.country,
            temp:data.main.temp,
            feels_like: data.main.feels_like,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            id: data.id
        })

        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: 'can\'t fetch weather'})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)

})