<template>
  <div>
    <FilterSelect
      @selectOption="applyFilter"
      :name="$t('watches.filters.country.name')"
      :defaultOption="$t('watches.filters.country.deaultOption')"
      :options="options"
      type="country"
    />
    <FilterSelect
      @selectOption="applyFilter"
      :name="$t('watches.filters.rmc.name')"
      :defaultOption="$t('watches.filters.rmc.deaultOption')"
      :options="options"
      type="rmc"
    />
  </div>
</template>

<script>
import FilterSelect from "../components/filters/FilterSelect";

export default {
  components: {
    FilterSelect
  },
  data() {
    return {
      filters: {
        country: "",
        rmc: ""
      },
      options: [
        {
          value: "Option1",
          label: "Option1"
        },
        {
          value: "Option2",
          label: "Option2"
        },
        {
          value: "Option3",
          label: "Option3"
        },
        {
          value: "Option4",
          label: "Option4"
        },
        {
          value: "Option5",
          label: "Option5"
        }
      ],
      watches: []
    };
  },
  methods: {
    applyFilter(options) {
      const { selectedOption, type } = options;
      this.filters[type] = selectedOption;
    }
  }
};
</script>