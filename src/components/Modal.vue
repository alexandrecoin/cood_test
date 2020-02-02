<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            <p>Filtre par classe</p>
            <select v-model="selectedType" @change="filterGroups">
              <option
                v-for="(group, index) in uniqueTypes"
                :value="group.type"
                :key="index"
              >
                {{ group.type }}
              </option>
            </select>
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div>
              <p>Filtre par nombre minimum d'utilisateurs</p>
              <input
                v-model="usersNumber"
                @change="filterGroups"
                type="number"
                min="0"
                placeholder="Rentrez un nombre"
              />
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <div>
              <p>Filtre par nom de groupe</p>
              <input
                v-model="userName"
                v-on:input="filterGroups"
                type="text"
                placeholder="Rentrez un nom de groupe"
              />
            </div>
          </slot>
        </footer>
        <button
          type="button"
          class="btn-green"
          @click="close"
          aria-label="Close modal"
          :disabled="!isFilterAvailable"
        >
          Use selected filter
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  filterByName,
  filterByType,
  filterByUserNumber,
} from '../helpers/filters';
export default {
  name: 'modal',
  props: ['groups'],
  data() {
    return {
      filteredGroups: this.$props.groups,
      uniqueTypes: [],
      selectedType: {},
      usersNumber: 0,
      userName: '',
      isFilterAvailable: false,
    };
  },
  methods: {
    getUniqueTypes() {
      this.uniqueTypes = this.$props.groups
        .map((e) => e['type'])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((obj) => this.$props.groups[obj])
        .map((e) => this.$props.groups[e]);
    },
    filterGroups() {
      this.isFilterAvailable = true;
      this.filteredGroups = filterByUserNumber(
        filterByType(
          filterByName(this.$props.groups, this.userName),
          this.selectedType,
        ),
        this.usersNumber,
      );
      return this.filteredGroups;
    },
    resetFilters() {
      this.selectedType = {};
      this.usersNumber = null;
      this.userName = '';
    },
    close() {
      this.$emit('onFilter', this.filteredGroups);
      this.isFilterAvailable = false;
      this.resetFilters();
    },
  },
  mounted() {
    this.getUniqueTypes();
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
