<script setup lang="ts">
import BikeMap from './components/BikeMap.vue'
import ErrorList from './components/ErrorList.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-toolbar-title>Oslo Bysykkel</v-toolbar-title>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <BikeMap />
    </v-main>
    <ErrorList />
  </v-app>
</template>
