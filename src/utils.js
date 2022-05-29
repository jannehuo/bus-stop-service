const getByPosition = (lat, lon, radius = 500) => {
  return `{
    stopsByRadius(lat:${lat},lon:${lon},radius:${radius}) {
      edges {
        node {
          stop { 
            gtfsId 
            name,
            code
          }
          distance
        }
      }
    }
  },`
}

const getDepartures = (stopId, startTime) => {
  return `{
    stop(id: "${stopId}") {
      name
      stoptimesWithoutPatterns(startTime: ${startTime}) {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign,
        trip {
          route {
            shortName
          }
        }
      }
    }  
  }`
}

const createStopsResponse = (response) => {
  const {
    data: { stopsByRadius: edges },
  } = response
  return edges.edges.map((edge) => ({
    id: edge.node.stop.gtfsId,
    name: edge.node.stop.name,
    code: edge.node.stop.code,
    dist: edge.node.distance,
  }))
}

module.exports = {
  getByPosition,
  getDepartures,
  createStopsResponse,
}
