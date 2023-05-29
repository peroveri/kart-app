<script setup lang="ts">
import { useCityBikesStore } from '@/stores/cityBikes'
import { storeToRefs } from 'pinia'

const store = useCityBikesStore()
const { errors, hasErrors } = storeToRefs(store)
const { clearErrors } = store
</script>

<template>
  <div class="text-center">
    <v-dialog width="auto" v-model="hasErrors">
      <v-card v-if="errors.length > 0">
        <v-card-text>
          <v-alert type="error" :title="errors[0].title" :text="errors[0].message"></v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="clearErrors()">Lukk</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
