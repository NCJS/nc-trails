<template>
  <div>
    <v-client-table :columns="columns" :data="cleanedTrails" :options="options"></v-client-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["trails"],
  data() {
    return {
      columns: ["name", "length"],
      options: {
        headings: {
          name: "Trail name",
          length: "length in km"
        },
        sortable: ["name", "length"],
        filterable: ["name"]
      }
    };
  },
  computed: {
    cleanedTrails() {
      if (this.trails.length === 0) return [];
      let currentTrail = this.trails[0].attributes.NAME;
      let currentLength = 0;
      let cleanTrails = [];
      this.trails.forEach(t => {
        if (t.attributes.NAME !== currentTrail) {
          cleanTrails.push({
            name: currentTrail,
            length: currentLength.toFixed(1)
          });
          currentLength = t.attributes.length;
          currentTrail = t.attributes.NAME;
        } else {
          currentLength = currentLength + t.attributes.length;
        }
      });
      return cleanTrails;
    }
  }
};
</script>

<style>
</style>
