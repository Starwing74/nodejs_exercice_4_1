const mywebserver = 'https://evening-escarpment-87282.herokuapp.com';
const express = require('express');
const app = express();
const formidable = require('express-formidable');
const path = require('path');
const axios = require('axios');
const PORT = 3000;

app.use(formidable());

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome'
    })
});

app.get('/planets', (req, res) => {
    console.log('planets');
    axios.get(`${mywebserver}/planets`)
        .then((results) => {
            res.render('planets', {
                title: 'Welcome',
                data: results.data
            })
        }).catch((err) => res.send(err));
});

app.post('/addplanet', (req, res) => {
    axios.post(`${mywebserver}/planets`, {
        name: req.fields.name,
        color: req.fields.color,
        icon: req.fields.icon
    })
        .then((results) => {
            res.render('planets', {
                title: 'My planets',
                data: results.data
            }).catch((err) => res.send(err));
        }).catch((err) => res.send(err));
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})