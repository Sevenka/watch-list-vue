<template>
  <el-table @row-click="handleRowClick" :data="itemsList" border>
    <el-table-column
      v-for="column in tableColumns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :sortable="column.sortable"
      class="table-row"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    itemsList: Array,
    tableColumns: Array
  },
  methods: {
    handleRowClick(row) {
      this.$emit("row-click", row);
    }
  }
};
</script>