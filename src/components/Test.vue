<template>
  <div class="test">
    <ul v-for="(group, index) in groups" v-bind:key="index">
      <li>
        <div class="card">
          <h1>{{ group.name }}</h1>
          <p>{{ group.type }}</p>
          <p>{{ group.users.length }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import groups from '../data/groups.json';
export default {
  name: 'Test',
  data() {
    return {
      groups,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
