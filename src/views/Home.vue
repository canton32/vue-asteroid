<template>
  <div v:show="!loading">
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Total Asteroids"
            type="gradient-info"
            :sub-title="`${page.total_elements}`"
            icon="ni ni-chart-bar-32"
            class="mb-4"
          >
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Total Pages"
            type="gradient-red"
            :sub-title="`${page.total_pages}`"
            icon="ni ni-active-40"
            class="mb-4"
          >
          </stats-card>
        </b-col>
      </b-row>
    </base-header>
    <b-container fluid class="mt--7 mb-5">
      <b-row>
        <b-col>
          <asteroid-table />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
} from 'element-ui'
import AsteroidTable from './Tables/AsteroidTable'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  components: {
    AsteroidTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
})
export default class Home extends Vue {
  @State((state) => state.data.page) page

  async created() {
    await this.$store.dispatch('data/getLikes')
    await this.$store.dispatch('data/getAsteroids', 0)
  }
}
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
