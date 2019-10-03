const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req , res) => {
    res.render('index' , {
        title : 'Weather App' , 
        name : 'Ishaan Agrawal'
    })
})

app.get ('/about' , (req , res) => {
    res.render ('about' , {
        title : 'About Me' ,
        name : 'Ishaan Agrawal'
    })
})

app.get ('/help' , (req , res) => {
    res.render ('help' , {
        helpText : 'Contact me for help' ,
        title : 'Help' ,
        name : 'Ishaan Agrawal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
   
   /* res.send({
        forecast : 'It is snowing' ,
        location : 'Delhi' ,
        address : req.query.address
    })
}) */

app.get ('/help/*' , (req, res) => {
    res.render ('404' , {
        errorMessage : 'Help article not found' ,
        title : '404' ,
        name : 'Ishaan Agrawal'
    })
})

app.get ('*' , (req, res) => {
    res.render ('404' , {
        errorMessage : '404 Error: Page not found' ,
        title : '404' ,
        name : 'Ishaan Agrawal'
    })
})

app.listen(3000, () => {
    console.log('Server is up on 3000')
})