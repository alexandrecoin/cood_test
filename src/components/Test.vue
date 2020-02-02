<template>
  <div class="test">
    <ul v-for="(group, index) in filterGroups" v-bind:key="index">
      <li>
        <div class="card">
          <h1>{{ group.name }}</h1>
          <p>{{ group.type }}</p>
          <p>{{ group.users.length }}</p>
        </div>
      </li>
    </ul>
    <div>
      <button @click="toggleFilter" type="button" :disabled="isFilterActivated">
        Filter
      </button>
      <button @click="resetData" type="button">Clear</button>
    </div>
    <div v-if="isFilterActivated">
      <p>Filtre par classe</p>
      <select v-model="selectedType">
        <option
          v-for="(group, index) in uniqueTypes"
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
          type="number"
          min="0"
          placeholder="Rentrez un nombre"
        />
      </div>
      <div>
        <p>Filtre par nom de groupe</p>
        <input
          v-model="userName"
          type="text"
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
  computed: {
    filterGroups() {
      let filteredGroups = groups;
      if (Object.entries(this.selectedType).length > 0) {
        filteredGroups = groups.filter((group) => group.type === this.selectedType);
      }
      if (this.userName) {
        filteredGroups = groups.filter((group) =>
          group.name.toLowerCase().includes(this.userName.toLowerCase()),
        );
      }
      if (this.usersNumber) {
        filteredGroups = groups.filter(
          (group) => group.users.length >= this.usersNumber,
        );
      }
      return filteredGroups;
    },
  },
  data() {
    return {
      isFilterActivated: false,
      uniqueTypes: [],
      selectedType: {},
      usersNumber: null,
      userName: '',
    };
  },
  methods: {
    getUniqueTypes() {
      this.uniqueTypes = groups
        .map((e) => e['type'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((obj) => groups[obj])
        .map((e) => groups[e]);
    },
    toggleFilter() {
      this.isFilterActivated = !this.isFilterActivated;
    },
    resetData() {
      this.selectedType = {}, 
      this.usersNumber = null;
      this.userName = '';
      this.toggleFilter();
    },
  },
  mounted() {
    this.getUniqueTypes();
  },
};
</script>

<style scoped>
.test {
  display: flex;
}
h1 {
  font-size: 1.2rem;
}
.card {
  border: 1px solid black;
  border-radius: 10%;
  width: 200px;
  height: 170px;
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
