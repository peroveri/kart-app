import type { StationInformationResponse, StationStatusResponse } from './cityBikesModel'

export const mapStationsWithStatus = (
  stationResponse: StationInformationResponse | null,
  statusResponse: StationStatusResponse | null
) => {
  if (stationResponse === null || statusResponse === null) {
    return null
  }

  const ret: StationInformationResponse['data']['stations'] &
    StationStatusResponse['data']['stations'] = []

  for (const station of stationResponse.data.stations) {
    const status = statusResponse.data.stations.find((y) => y.station_id === station.station_id)

    if (status !== undefined) {
      ret.push({
        ...station,
        ...status
      })
    }
  }

  return ret
}
