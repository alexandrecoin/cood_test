<template>
  <div class="test">
    <ul v-for="(group, index) in filteredGroups" v-bind:key="index">
      <li>
        <div class="card">
          <h1>{{ group.name }}</h1>
          <p>{{ group.type }}</p>
          <p>{{ group.users.length }}</p>
        </div>
      </li>
    </ul>
    <div>
      <button @click="toggleFilter" type="button">
        Filter
      </button>
      <button @click="resetData" type="button">Clear</button>
    </div>
    <modal
      v-show="isFilterModalVisible"
      :groups="filteredGroups"
      @onFilter="changeHandler"
      @close="toggleFilter"
    />
  </div>
</template>
<script>
import groups from '../data/groups.json';
import modal from './Modal.vue';
export default {
  name: 'Test',
  components: {
    modal,
  },
  data() {
    return {
      filteredGroups: groups,
      isFilterModalVisible: false,
    };
  },
  methods: {
    toggleFilter() {
      this.isFilterModalVisible = !this.isFilterModalVisible;
    },
    resetData() {
      this.filteredGroups = groups;
    },
    changeHandler(value) {
      this.filteredGroups = value;
      this.isFilterModalVisible = false;
    },
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
