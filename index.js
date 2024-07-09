const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ensure you have your PRIVATE_APP_ACCESS stored in a .env file
require('dotenv').config();
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

// Route 1: Homepage to display custom objects
app.get('/', async (req, res) => {
    const customObjectsURL = `https://api.hubapi.com/crm/v3/objects/YOUR_CUSTOM_OBJECT_ID`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(customObjectsURL, { headers });
        const data = response.data.results;
        res.render('homepage', { title: 'Homepage | Custom Objects', data });
    } catch (error) {
        console.error(error);
        res.send('Error retrieving custom objects.');
    }
});

// Route 2: Form to create/update custom object
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// Route 3: Handle form submission for custom objects
app.post('/update-cobj', async (req, res) => {
    const newObject = {
        properties: {
            pet_name: req.body.pet_name,
            pet_type: req.body.pet_type,
            pet_age: req.body.pet_age
        }
    };

    const customObjectsURL = `https://api.hubapi.com/crm/v3/objects/YOUR_CUSTOM_OBJECT_ID`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(customObjectsURL, newObject, { headers });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('Error creating/updating custom object.');
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
