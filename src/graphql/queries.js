const { default: axios } = require('axios')
const { API_URL } = require('../config')
const { getByPosition, createStopsResponse } = require('../utils')

const getNearbyStops = async (lat, lon, radius) => {
  const query = getByPosition(lat, lon, radius)
  try {
    const results = await axios({
      method: 'POST',
      url: API_URL,
      data: {
        query,
      },
    })
    return createStopsResponse(results.data)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getNearbyStops,
}
