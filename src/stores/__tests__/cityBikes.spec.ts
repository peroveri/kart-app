import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCityBikesStore } from '../cityBikes'
import { stationInformation, stationStatus } from './testData'

describe('City Bikes Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('stationsWithStatus is null by default', () => {
    const store = useCityBikesStore()
    expect(store.stationsWithStatus).toBeNull()
  })

  it('stationsWithStatus is set with data', () => {
    const expected = [
      {
        is_installed: 1,
        is_renting: 1,
        num_bikes_available: 9,
        num_docks_available: 11,
        last_reported: 1540219230,
        is_returning: 1,
        station_id: '627',
        name: 'Skøyen Stasjon',
        address: 'Skøyen Stasjon',
        lat: 59.9226729,
        lon: 10.6788129,
        capacity: 20
      }
    ]

    const store = useCityBikesStore()
    store.stationInformation = stationInformation
    store.stationStatus = stationStatus
    expect(store.stationsWithStatus).toStrictEqual(expected)
  })
})
