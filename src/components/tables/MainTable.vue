<template>
  <div>
    <el-table @row-click="handleRowClick" :data="itemsList" style="width: 100%">
      <el-table-column
        v-for="column in tableColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      />
    </el-table>
  </div>
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