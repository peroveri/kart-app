<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LIcon,
  LControl,
  LFeatureGroup
} from '@vue-leaflet/vue-leaflet'
import { ref, onMounted } from 'vue'
import { useCityBikesStore } from '@/stores/cityBikes'
import { storeToRefs } from 'pinia'

const store = useCityBikesStore()
const { stationsWithStatus } = storeToRefs(store)
const { fetchAll } = store
const zoom = ref(11)

onMounted(async () => {
  await fetchAll()
})

const getRadius = (zoomLevel: number) => (zoomLevel >= 13 ? 5 : 3)
const onZoomChange = (e: number) => (zoom.value = e)
const toggle_mode = ref('find_bike')

const getIconClass = (item, toggle_mode: string) => {
  const defaultClass = 'div-icon text-center'
  if (toggle_mode === 'find_bike' && item.num_bikes_available === 0) {
    return defaultClass + ' gray'
  }
  if (toggle_mode === 'deliver_bike' && item.num_docks_available === 0) {
    return defaultClass + ' gray'
  }
  return defaultClass
}
</script>

<template>
  <l-map
    ref="map"
    :zoom="11"
    v-on:update:zoom="onZoomChange"
    :center="[59.9, 10.7]"
    :use-global-leaflet="false"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    ></l-tile-layer>
    <l-control position="topright">
      <v-btn-toggle v-model="toggle_mode" borderless>
        <v-btn value="find_bike">
          <span>Finn sykkel</span>
        </v-btn>
        <v-btn value="deliver_bike">
          <span>Lever sykkel</span>
        </v-btn>
      </v-btn-toggle>
    </l-control>
    <l-feature-group>
      <template v-if="stationsWithStatus !== null">
        <template v-for="item in stationsWithStatus" v-bind:key="item.station_id">
          <l-marker :lat-lng="[item.lat, item.lon]" :radius="getRadius(zoom)">
            <l-icon :class-name="''">
              <div :class="getIconClass(item, toggle_mode)">
                {{
                  toggle_mode === 'deliver_bike'
                    ? item.num_docks_available
                    : item.num_bikes_available
                }}
              </div>
            </l-icon>
            <l-tooltip>
              {{ item.name }}<br />
              Sykler: {{ item.num_bikes_available }}<br />
              Låser: {{ item.num_docks_available }}<br />
              Kapasitet: {{ item.capacity }}<br />
            </l-tooltip>
            <div>text</div>
          </l-marker>
        </template>
      </template>
    </l-feature-group>
  </l-map>
</template>

<style scoped>
.div-icon {
  background-color: #1565c0aa;
  border-radius: 50%;
  height: 19px;
  width: 19px;
  color: white;
}

.div-icon.gray {
  background-color: gray;
}
</style>
