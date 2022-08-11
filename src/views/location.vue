<template>
  <div v-if="plots.loading" class="text-center my-5">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else-if="plots.data.length" class="row gx-0 text-center text-white">
    <div
      v-for="{ fields: plot, id } in plots.data"
      :key="id"
      class="col-1 border border-dark"
      :class="plot.Available ? 'bg-success' : 'bg-danger'"
      role="alert"
      :title="`Plot Number ${plot.PlotNumber}`"
    >
      {{ plot.PlotNumber }}
    </div>
  </div>

  <div v-else class="alert alert-info" role="alert">
    There are no campsites available at this time.
  </div>
</template>

<script>
import { plots, fetchPlots } from "../lib/plots";
export default {
  props: {
    slug: String,
  },
  setup(props) {
    fetchPlots(props.slug);
    return { plots };
  },
};
</script>
