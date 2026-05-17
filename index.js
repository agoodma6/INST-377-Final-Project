const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = supabaseClient.createClient(
    supabaseUrl,
    supabaseKey
);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', {
        root: __dirname
    });
});

app.get('/savedDays', async (req, res) => {

    const { data, error } = await supabase
        .from('saved_days')
        .select();

    if (error) {
        res.status(500).send(error);
    }

    else {
        res.json(data);
    }
});

app.post('/saveDay', async (req, res) => {

    const location = req.body.location;
    const date = req.body.date;
    const temperature = req.body.temperature;
    const weather = req.body.weather;

    const { data, error } = await supabase
        .from('saved_days')
        .insert({
            location: location,
            date: date,
            temperature: temperature,
            weather: weather
        })
        .select();

    if (error) {
        res.status(500).send(error);
    }

    else {
        res.json(data);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});