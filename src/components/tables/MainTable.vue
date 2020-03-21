<template>
  <el-table :data="itemsList" style="width: 100%">
    <el-table-column
      v-for="column in tableColumns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
    />
  </el-table>
</template>

<script>
export default {
  props: {
    itemsList: Array,
    tableColumns: Array
  }
};
</script>