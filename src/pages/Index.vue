<template>
  <div v-loading.fullscreen.lock="loading">
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
    <MainTable
      @row-click="confirmAddToOrder"
      :itemsList="filteredWatchesList"
      :tableColumns="tableColumns"
    />
    <AddItemDialog
      v-if="selectedWatch"
      @on-cancel="handleCancel"
      @on-yes="handleYes"
      :dialogVisible="isAddToOrderDialogShown"
      :title="$t('watches.addItemModal.title')"
      :content="$t('watches.addItemModal.content', { rmc: selectedWatch.rmc, price: selectedWatch.price })"
      :cancelTitle="$t('watches.addItemModal.actions.cancel')"
      :yesTitle="$t('watches.addItemModal.actions.yes')"
    />
  </div>
</template>

<script>
import FilterSelect from "../components/filters/FilterSelect";
import MainTable from "../components/tables/MainTable";
import AddItemDialog from "../components/dialogs/AddItemDialog";

export default {
  components: {
    FilterSelect,
    MainTable,
    AddItemDialog
  },
  data() {
    return {
      loading: true,
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
      ],
      selectedWatch: null,
      isAddToOrderDialogShown: false
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
      this.loading = true;
      fetch(
        "http://my-json-server.typicode.com/sevenka/watch-list-vue/watchesList"
      )
        .finally(() => (this.loading = false))
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
    },
    confirmAddToOrder(watch) {
      this.selectedWatch = watch;
      this.setShowAddToOrderDialog(true);
    },
    setShowAddToOrderDialog(status) {
      this.isAddToOrderDialogShown = status;
    },
    handleCancel() {
      this.selectedWatch = null;
      this.setShowAddToOrderDialog(false);
    },
    handleYes() {
      this.loading = true;
      this.selectedWatch = null;
      this.setShowAddToOrderDialog(false);
      setTimeout(() => {
        this.$notify({
          title: this.$t("watches.notification.success.title"),
          message: this.$t("watches.notification.success.message"),
          type: "success"
        });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>