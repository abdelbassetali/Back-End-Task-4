const express = require("express")
const app = express()

const port = process.env.PORT || 3000

const path = require("path")
const publicDirectory = path.join(__dirname, "../public")
app.use(express.static(publicDirectory))

const hbs = require('hbs');
const partialsPath = path.join(__dirname, '../partials')

const request = require('request')
const geodata = require('./tools/geaodata')
const forcast = require('./tools/forcast')

hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    res.render('index', {
        // title: 'Home',
        // desc: "This is home page",
        // name: "Abd elbasset",
        // job: "I work as a website developer",
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you mast provide address'
        })
    }
    geodata(req.query.address, (error, data) => {

        if (error) {
            return res.send({ error })
        }
        forcast(data.longitude, data.latitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forcast: forcastData,
                location: req.query.address,
                longitude: data.longitude,
                latitude: data.latitude
            })
        })
    })
})








app.listen(port, () => {
    console.log(`app is listeing on port  ${port}`)
})






























//  req.query    key value  بيشيل كل حاجه موجوده فى اليوارال سواء
// app.get('/products', (req, res) => {
//     console.log(req.query)
//     res.send({
//         produtc: 'bmw 520'
//     })
// })

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "you mast provide address"
//         })
//     }
//     res.send({
//         location: req.query.address,
//         forecast: 'cold'
//     })
// })
// ( * ) معناها او رويت انا شمش معرفه
// ولازم اعمله اخر حاجه لان لو عملت اى روت بعديه مش هيشتغل
// app.get("*", (req, res) => {
//     res.send("404 page  not found")
// })

// app.get('/conect', (req, res) => { (*)  مش هيشتغل لانه بعد
//     res.render('conect', {
//         title: 'conect',
//         name: "the support",
//         desc: 'How can we help you',
//         call: '01123242526',
//         img: "images/conect.jpg"

//     })
// })