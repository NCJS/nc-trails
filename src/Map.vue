<template>
  <div class="map-wrapper">
    <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
      <div v-for="(t,i) in reverseLatLng" :key="i">
        <l-polyline :lat-lngs="t" color="red"></l-polyline>
      </div>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LPolyline } from "vue2-leaflet";
import { log } from "util";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LPolyline
  },
  data: function() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };
  },
  props: ["zoom", "center", "trails"],
  computed: {
    reverseLatLng: function() {
      return this.trails.map(t => {
        return t.geometry.paths[0].map(tt => [tt[1], tt[0]]);
      });
    }
  }
};
</script>

<style>
.map-wrapper {
  height: 50vh;
}
</style>
