<template>
  <div class="test">
    <ul v-for="(group, index) in array" v-bind:key="index">
      <li>
        <div class="card">
          <h1>{{ group.name }}</h1>
          <p>{{ group.type }}</p>
          <p>{{ group.users.length }}</p>
        </div>
      </li>
    </ul>
    <div>
      <button @click="activateFilter" type="button">Filter</button>
      <button @click="getUniqueTypes" type="button">Clear</button>
    </div>
    <div v-if="isFilterActivated">
      <select v-model="selected" @change="onChange($event)">
        <option
          v-for="(group, index) in unique"
          :value="group.type"
          :key="index"
        >
          {{ group.type }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import groups from '../data/groups.json';
export default {
  name: 'Test',
  data() {
    return {
      array: groups,
      isFilterActivated: false,
      selected: {},
      unique: [],
    };
  },
  methods: {
    getUniqueTypes() {
      this.unique = groups
        .map((e) => e['type'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((obj) => groups[obj])
        .map((e) => groups[e]);
      /* eslint-disable no-console */
    },
    activateFilter() {
      this.isFilterActivated = !this.isFilterActivated;
    },
    onChange(event) {
      let filteredArray = groups.filter(
        (group) => group.type === event.target.value,
      );
      this.array = filteredArray;
    },
  },
  mounted() {
    this.getUniqueTypes();
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}
.card {
  border: 1px solid black;
  border-radius: 10%;
  width: 200px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
