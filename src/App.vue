<template>
  <div id="app">
    <h1>NC trails</h1>
    <ol>
      <li v-for="trail in trails" :key="trail.attributes.OBJECTID">{{trailName(trail.attributes)}}</li>
    </ol>
  </div>
</template>

<script>
import axios from "axios";
import { lineString, length } from "@turf/turf";
import { log } from "util";

export default {
  name: "app",
  components: {},
  data: function() {
    return {
      trails: []
    };
  },
  mounted() {
    const getData = async () => {
      let temp = await axios.get(
        "https://gis.nevcounty.net/arcgis/rest/services/web_public/Open_Data_Layers_Nevada_County/MapServer/1400/query?where=1%3D1&outFields=*&outSR=4326&f=json"
      );
      const allTrails = temp.data.features;
      this.trails = allTrails.map(t => {
        var line = lineString(t.geometry.paths[0]);
        var l = length(line, { units: "miles" });
        return { ...t, attributes: { ...t.attributes, length: l } };
      });
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
</style>
