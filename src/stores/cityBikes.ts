import { defineStore } from 'pinia'
import { mapStationsWithStatus } from './cityBikesMappings'
import type { Feeds, StationInformationResponse, StationStatusResponse } from './cityBikesModel'
import { createAPI } from './api/gbfs'

const apiInstance = createAPI()

export const useCityBikesStore = defineStore('cityBikes', {
  state: () => ({
    stationInformation: null as StationInformationResponse | null,
    stationStatus: null as StationStatusResponse | null,

    /**
     * Holds the feeds which can be used to retrieve other resources
     */
    feeds: null as Feeds | null,
    errors: [] as any[]
  }),
  getters: {
    /**
     * Combines station information with status
     */
    stationsWithStatus: (state) =>
      mapStationsWithStatus(state.stationInformation, state.stationStatus),

    /**
     * Returns true if there are any unhandled errors
     */
    hasErrors: (state) => state.errors.length > 0
  },
  actions: {
    async fetchAll() {
      // autodiscover
      // feeds.value = (await apiInstance.get('station_information.json')).data

      // get info, status
      try {
        this.stationInformation = (await apiInstance.get('station_information.json')).data
        this.stationStatus = (await apiInstance.get('station_status.json')).data
      } catch (error) {
        if (error instanceof Error) {
          this.errors.unshift({ title: 'Feil ved lasting av data', message: error.toString() })
        } else {
          throw error
        }
      }
    },
    clearErrors() {
      this.errors = []
    }
  }
})
