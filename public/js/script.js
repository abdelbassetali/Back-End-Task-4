
const form = document.getElementById('form1')
const address = document.getElementById('address')
const errorf = document.getElementById('error')
const locationf = document.getElementById('location')
const forecastf = document.getElementById('forecast')
const longitude = document.getElementById("longitude")
const latitude = document.getElementById('latitude')
const pweather = document.getElementById('pweather')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weather()
    form.reset()
})

let weather = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorf.innerText = data.error
            errorf.style.fontSize="25px"
            errorf.style.fontWeight="800"
            errorf.style.backgroundColor = 'rgba(138, 209, 222, 0.578)'
            locationf.innerText = ''
            forecastf.innerText = ''
            longitude.innerText = ''
            latitude.innerText = ''
            pweather.style.display = 'block'
        }
        else {
            locationf.innerText = data.location
            latitude.innerText = data.latitude
            longitude.innerText = data.longitude
            forecastf.innerText = data.forcast
            errorf.innerText = ''
            pweather.style.display = 'none'
            longitude.style.backgroundColor = 'rgba(138, 209, 222, 0.578)'
            longitude.style.color="black"
            longitude.style.fontSize="20px"
            longitude.style.fontWeight="800"
            latitude.style.backgroundColor = 'rgba(138, 209, 222, 0.578)'
            latitude.style.color="black"
            latitude.style.fontSize="20px"
            latitude.style.fontWeight="800"
            forecastf.style.backgroundColor = 'rgba(138, 209, 222, 0.578)'
            forecastf.style.color="black"
            forecastf.style.fontSize="20px"
            forecastf.style.fontWeight="800"
            locationf.style.textTransform="capitalize"
            locationf.style.backgroundColor = 'rgba(138, 209, 222, 0.578)'
            locationf.style.color="black"
            locationf.style.fontSize="20px"
            locationf.style.fontWeight="800"
        }
    }
    catch (e) {
        console.log(e)
    }
}

