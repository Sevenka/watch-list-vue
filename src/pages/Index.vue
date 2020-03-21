<template>
  <div>
    <FilterSelect
      @selectOption="applyFilter"
      :name="$t('watches.filters.country.name')"
      :defaultOption="$t('watches.filters.country.deaultOption')"
      :options="countriesFilterList"
      type="country"
    />
    <FilterSelect
      @selectOption="applyFilter"
      :name="$t('watches.filters.rmc.name')"
      :defaultOption="$t('watches.filters.rmc.deaultOption')"
      :options="rmcsFilterList"
      type="rmc"
    />
    <MainTable :itemsList="filteredWatchesList" :tableColumns="tableColumns" />
  </div>
</template>

<script>
import FilterSelect from "../components/filters/FilterSelect";
import MainTable from "../components/tables/MainTable";

export default {
  components: {
    FilterSelect,
    MainTable
  },
  data() {
    return {
      loading: false,
      filters: {
        country: "",
        rmc: ""
      },
      countriesFilterList: [],
      rmcsFilterList: [],
      watchesList: [],
      tableColumns: [
        {
          prop: "country",
          label: this.$t("watches.tableColumns.country")
        },
        {
          prop: "quantity",
          label: this.$t("watches.tableColumns.quantity")
        },
        {
          prop: "rmc",
          label: this.$t("watches.tableColumns.rmc")
        }
      ]
    };
  },
  computed: {
    filteredWatchesList() {
      return this.watchesList.filter(watch => {
        return (
          watch.country.includes(this.filters.country) &&
          watch.rmc.includes(this.filters.rmc)
        );
      });
    }
  },
  created() {
    this.getWatchesList();
  },
  methods: {
    applyFilter(options) {
      const { selectedOption, type } = options;
      this.filters[type] = selectedOption;
    },
    getWatchesList() {
      fetch(
        "http://my-json-server.typicode.com/sevenka/watch-list-vue/watchesList"
      )
        .then(response => response.json())
        .then(data => {
          this.watchesList = data;
          this.countriesFilterList = data.map(watch => {
            return {
              value: watch.country
            };
          });
          this.rmcsFilterList = data.map(watch => {
            return {
              value: watch.rmc
            };
          });
        });
    }
  }
};
</script>