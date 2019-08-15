<template>
  <div id="Home" class="home">
    <div v-if="loading" class="fullscreen">
      <h1>Loading...</h1>
    </div>
      <h2 v-if="error" class="error">{{error}}</h2>
    <Map :zoom="zoom" :center="center" :trails="trails" :updateMapValues="updateMapValues"/>
    <Table :trails="trails"/>
  </div>
</template>

<script>
import Header from "./Header";
import Table from "./Table";
import Map from "./Map";
import axios from "axios";
import { lineString, length } from "@turf/turf";
import { log } from "util";



export default {
  name: "Home",
  components: { Map, Table, Header },
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
         // console.log("err", err);
          this.loading = false;
          this.error = err;
        });
      const allTrails = temp.data.features;
      this.trails = allTrails.map(t => {
        // flatten t.geometry.paths for trails made up of multiple segments
        const lineArr = [];
        t.geometry.paths.forEach(el =>
          el.forEach(elInner => lineArr.push(elInner))
        );
        // create geoJson
        var line = lineString(lineArr);
        // calculate length
        var l = length(line, { units: "miles" });
        // add length to trail object
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
    },
    updateMapValues(zoom, center) {
      this.zoom = zoom;
      this.center = center;
      //console.log("zoom, center", zoom, center);
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
}
.fullscreen {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  background: white;
}
.error {
  color: red;
}
.menu{
  background-color:cornflowerblue;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border: 1px solid white;
}
</style>
