<template>
  <div>
    <v-client-table :columns="columns" :data="filteredTrailList" :options="options"></v-client-table>
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
     filteredTrailList() {
      if (this.trails.length === 0) return [];
		 let filteredTrailList = [];
		 let obj = {}
      this.trails.forEach(t => {
        if (!obj[t.attributes.NAME]) {
          // trail name key does not exist, populate with trail
		   obj[t.attributes.NAME] = t;
		   filteredTrailList.push({
             name: t.attributes.NAME,
			 length: t.attributes.length.toFixed(1)
			 });
        } else { 
			//trail name does exist, find it in trail array and sum length
			var specificTrail = function(trailName){
				let trailID = filteredTrailList.findIndex(obje => obje.name == t.attributes.NAME);
				return trailID;
			}
			let trailPartialLength = parseFloat(t.attributes.length.toFixed(1));
			let currentTrailLengthNum = parseFloat(filteredTrailList[specificTrail(t.attributes.NAME)].length);
			filteredTrailList[specificTrail(t.attributes.NAME)].length = (currentTrailLengthNum + trailPartialLength).toFixed(1); 
		}
	  });
      return filteredTrailList;
    }
  }
};
</script>

<style>
</style>
