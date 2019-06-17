<template>
  <div id="app">
    <h1>NC trails</h1>
    <h2 v-if="loading">Loading</h2>
    <h2 v-if="error" class="error">{{error}}</h2>
    <Map :zoom="zoom" :center="center" :trails="trails"/>
    <ol>
      <li v-for="trail in trails" :key="trail.attributes.OBJECTID">{{trailName(trail.attributes)}}</li>
    </ol>
  </div>
</template>

<script>
import Map from "./Map";
import axios from "axios";
import { lineString, length } from "@turf/turf";
import { log } from "util";

export default {
  name: "app",
  components: { Map },
  data: function() {
    return {
      trails: [],
      loading: true,
      error: null,
      zoom: 10,
      center: [39.26, -121.01]
    };
  },
  mounted() {
    const getData = async () => {
      let temp = await axios
        .get(
          "https://gis.nevcounty.net/arcgis/rest/services/web_public/Open_Data_Layers_Nevada_County/MapServer/1400/query?where=1%3D1&outFields=*&outSR=4326&f=json"
        )
        .catch(err => {
          console.log("err", err);
          this.loading = false;
          this.error = err;
        });
      const allTrails = temp.data.features;
      this.trails = allTrails.map(t => {
        var line = lineString(t.geometry.paths[0]);
        var l = length(line, { units: "miles" });
        return { ...t, attributes: { ...t.attributes, length: l } };
      });
      this.loading = false;
    };
    getData();
  },
  methods: {
    trailName: function(trail) {
      return trail.OWNERSHIP
        ? `${trail.NAME} - ${trail.OWNERSHIP} - ${trail.length.toFixed(1)}mi`
        : `${trail.NAME} - ${trail.length.toFixed(1)}mi`;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.error {
  color: red;
}
</style>
