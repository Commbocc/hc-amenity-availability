<script setup>
import { amenities, fetchAmenities } from "../lib/amenities";
import LocationAmenity from "../components/LocationAmenity/index.vue";
import { title } from "../lib/title";

const props = defineProps({ slug: String });
title.value = props.slug;

fetchAmenities(props.slug);
</script>

<template>
  <div v-if="amenities.loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="amenities.data.length">
    <LocationAmenity
      v-for="{ fields: locationAmenity, id } in amenities.data"
      :key="id"
      :location-amenity="locationAmenity"
      class="mb-3"
    />
  </div>

  <div v-else class="alert alert-info" role="alert">
    There are no slots available at this time.
  </div>
</template>
