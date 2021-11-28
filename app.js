const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./restaurant.json').results

//template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//static file
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  const restaurant = restaurants.find(one => one.id.toString() === restaurantId)
  res.render('show', { restaurant })
})

app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const filteredRestaurants = restaurants.filter(data => {
    return data.name.toLowerCase().includes(keyword.toLowerCase()) || data.category.includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: filteredRestaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})