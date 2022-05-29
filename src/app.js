import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import hbs from 'hbs';
import geocode from './utils/resolveGeocode.js'
import forecast from './utils/weatherforcast.js'

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.resolve(__dirname, '../public');
const viewsDirectoryPath = path.resolve(__dirname, '../templates/views');
const partialsDirectoryPath = path.resolve(__dirname, '../templates/partials');

app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsDirectoryPath);

app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);


app.get("", (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Olaobi Ifedayo Fasakin'
    });
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Olaobi Ifedayo Fasakin'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Olaobi Ifedayo Fasakin',
        helpText: 'This is for help text'
    })
})

app.get('/weather', (req, res) => {
    let {address = null} = req.query;
    if (!address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    }

    address = encodeURIComponent(address);

    geocode(address, (error, result) => {
        if (error) {
            return res.send(error);
        }

        forecast({...result}, (e, forcastData) => {
            if (error) {
                return res.send(e);
            }
            res.send({
                forecast: forcastData,
                address: decodeURIComponent(address)
            })
        })
    })


})


app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help article not found',
        name: 'olaobi Ifedayo Fasakin',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        name: 'olaobi Ifedayo Fasakin',
        title: '404'
    })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})