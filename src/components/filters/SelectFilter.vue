<template>
  <div class="filter">
    <span class="filter-title">{{ name }}</span>
    <el-select
      v-model="selectedOption"
      @change="selectOption"
      :placeholder="defaultOption"
      filterable
      clearable
    >
      <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    defaultOption: String,
    options: Array,
    type: String
  },
  data() {
    return {
      selectedOption: ""
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.$emit("selectOption", {
        selectedOption: this.selectedOption,
        type: this.type
      });
    }
  }
};
</script>

<style scoped>
.filter {
  margin-bottom: 1rem;
}
.filter-title {
  margin-right: 1rem;
}
</style>
