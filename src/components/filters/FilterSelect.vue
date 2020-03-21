<template>
  <div>
    {{ name }}
    <el-select
      v-model="selectedOption"
      @change="selectOption"
      :placeholder="defaultOption"
      filterable
      clearable
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
