const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'ddf2b67eb84f588395dc82e9ffc8c7cb';  // Use your active key

app.get('/weather', async (req, res) => {
    try {
        const { city } = req.query;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        res.json({
            temp: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
