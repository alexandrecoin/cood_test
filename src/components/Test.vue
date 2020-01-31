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
      <button @click="toggleFilter" type="button">Filter</button>
      <button @click="resetData" type="button">Clear</button>
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
      <div>
        <p>Filtre par nombre minimum d'utilisateurs</p>
        <input
          v-model="usersNumber"
          @input="numberFilter($event)"
          placeholder="Rentrez un nombre"
        />
      </div>
      <div>
        <p>Filtre par nom de groupe</p>
        <input
          v-model="userName"
          @input="nameFilter($event)"
          placeholder="Rentrez un nom de groupe"
        />
      </div>
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
      // Filtre 1
      selected: {},
      unique: [],
      // Filtre 2
      usersNumber: 0,
      // Filtre 3
      userName: '',
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
    toggleFilter() {
      this.isFilterActivated = !this.isFilterActivated;
    },
    onChange(event) {
      let filteredArray = groups.filter(
        (group) => group.type === event.target.value,
      );
      this.array = filteredArray;
    },
    numberFilter(event) {
      this.array = groups.filter(
        (group) => group.users.length >= event.target.value,
      );
    },
    nameFilter(event) {
      this.array = groups.filter((group) =>
        group.name.toLowerCase().includes(event.target.value.toLowerCase()),
      );
    },
    resetData() {
      this.array = groups;
      this.toggleFilter();
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
