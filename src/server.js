const express = require('express')
var cors = require('cors')
const { getNearbyStops } = require('./graphql/queries')

const app = express()
app.use(cors())
const port = 8080

app.post('/nearby/:lat/:lon/:radius', async (req, res) => {
  const { lat, lon, radius } = req.params
  const results = await getNearbyStops(lat, lon, radius)
  res.send(results)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
