<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3>Asteroid table</h3>
      <date-range-picker
        style="font-size: 20px"
        v-model="dateRange"
        @update="updateValues"
      >
      </date-range-picker>
      <template #input="picker" style="min-width: 150px">
        {{ picker.startDate | date }} - {{ picker.endDate | date }}
      </template>
      <b-button ref="button" variant="primary" @click="handleClear"
        >Clear
      </b-button>
    </b-card-header>
    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="asteroids"
    >
      <el-table-column label="ID" min-width="100px" prop="id">
        <template v-slot="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Name" min-width="150px" prop="name">
        <template v-slot="{ row }">
          <span class="font-weight-600 name mb-0 text-sm">
            {{ row.name }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="PHA" min-width="100px" prop="pha">
        <template v-slot="{ row }">
          <i
            :class="
              `text-${
                row.is_potentially_hazardous_asteroid ? 'danger' : 'success'
              } ni ni-planet`
            "
          >
          </i>
        </template>
      </el-table-column>

      <el-table-column label="Magnitude" min-width="80px" prop="magnitude">
        <template v-slot="{ row }">
          <span>{{ row.absolute_magnitude_h }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="Close Approach"
        min-width="100px"
        prop="close_approach"
      >
        <template v-slot="{ row }">
          <span v-if="row.close_approach_data[0]">{{
            row.close_approach_data[0].close_approach_date
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="" prop="action" min-width="240px">
        <template v-slot="{ row }">
          <base-button
            class="btn-circle"
            :type="isLiked(row.id) ? 'primary' : 'secondary'"
            @click="handleLike(row.id)"
          >
            <i class="fa fa-heart"></i>
          </base-button>
        </template>
      </el-table-column>
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="getPageSize()"
        :total="totalPages"
        @change="handleChange"
        align="center"
      ></base-pagination>
    </b-card-footer>
  </b-card>
</template>
<script>
import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

@Component({
  name: 'asteroid-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    DateRangePicker,
  },
  filters: {
    date(val) {
      return val ? val.toLocaleDateString() : ''
    },
  },
})
export default class AsteroidTable extends Vue {
  @State((state) => state.data.asteroids) asteroids
  @State((state) => state.data.page.number) number
  @State((state) => state.data.page.total_pages) totalPages
  @State((state) => state.data.likes) likes

  rangeMode = false

  currentPage = 1

  dateRange = { startDate: null, endDate: null }

  mounted() {
    this.currentPage = this.number + 1
  }

  updateValues() {
    this.rangeMode = true
    this.$store.dispatch('data/getFeed', this.dateRange)
  }

  getPageSize() {
    return process.env.NEOWS_PAGE_SIZE
  }

  handleChange(currentPage) {
    this.currentPage = currentPage
    if (!this.rangeMode) {
      this.$store.dispatch('data/getAsteroids', this.currentPage - 1)
    }
  }

  isLiked(id) {
    return this.likes.includes(id)
  }

  handleClear() {
    this.rangeMode = false
    this.dateRange = { startDate: null, endDate: null }
  }

  handleLike(id) {
    const action = !this.isLiked(id) ? 'createUserLike' : 'deleteUserLike'

    this.$store.dispatch(`data/${action}`, id)
  }
}
</script>
<style inline>
.reportrange-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-circle {
  width: 40px;
  height: 40px;
  padding: 6px 0px;
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}
</style>
