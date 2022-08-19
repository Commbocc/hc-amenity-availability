<script setup>
import { computed } from "vue";
import { parse } from "marked";

const props = defineProps({
  locationAmenity: Object,
});

const capacityReached = computed(() => {
  return (props.locationAmenity.Available || 0) <= 0;
});

const cardBackgroundClass = computed(() => {
  return capacityReached.value ? "alert-warning" : "alert-info";
});

const notesMarkdown = computed(() => {
  return parse(props.locationAmenity.Notes);
});
</script>

<template>
  <div role="alert" class="card">
    <div
      class="d-flex align-items-center justify-content-between bg-gradient alert mb-0"
      :class="cardBackgroundClass"
    >
      <h6 class="mb-0 pe-3">
        {{ locationAmenity.Name }}
      </h6>

      <strong v-if="capacityReached" v-show="capacityReached">
        Capacity Limit Reached
      </strong>

      <strong v-else>
        {{ locationAmenity.Available }} /
        {{ locationAmenity.Capacity }}
        Slots Available
      </strong>
    </div>

    <div v-if="locationAmenity.Notes" class="card-body">
      <div v-html="notesMarkdown" class="card-text small"></div>
    </div>
  </div>
</template>
