/**
 * @link https://gbfs.mobilitydata.org/specification/reference/#output-format
 */
export interface GBFSResponse<T> {
  last_updated: number
  ttl: number
  version: string
  data: T
}

export type Feeds = GBFSResponse<{
  nb: {
    feeds: {
      url: string
      name: string
    }[]
  }
}>

/**
 * @link https://gbfs.mobilitydata.org/specification/reference/#station_informationjson
 */
export type StationInformationResponse = GBFSResponse<{
  stations: {
    address: string
    capacity: number
    lat: number
    lon: number
    name: string
    station_id: string
  }[]
}>

/**
 * @link https://gbfs.mobilitydata.org/specification/reference/#station_statusjson
 */
export type StationStatusResponse = GBFSResponse<{
  stations: {
    is_installed: boolean
    is_renting: boolean
    is_returning: boolean
    last_reported: number
    num_bikes_available: number
    num_docks_available: number
    station_id: string
  }[]
}>
