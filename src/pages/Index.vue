<template>
  <el-container v-loading.fullscreen.lock="loading" class="container">
    <el-main>
      <el-row>
        <el-col :span="12">
          <SelectFilter
            @selectOption="applyFilter"
            :name="$t('watches.filters.country.name')"
            :defaultOption="$t('watches.filters.country.deaultOption')"
            :options="countriesFilterList"
            type="country"
          />
        </el-col>
        <el-col :span="12">
          <SelectFilter
            @selectOption="applyFilter"
            :name="$t('watches.filters.rmc.name')"
            :defaultOption="$t('watches.filters.rmc.deaultOption')"
            :options="rmcsFilterList"
            type="rmc"
          />
        </el-col>
      </el-row>
      <ProductsTable
        @row-click="confirmAddToOrder"
        :itemsList="filteredWatchesList"
        :tableColumns="tableColumns"
      />
      <ConfirmDialog
        v-if="isAddToOrderDialogShown"
        @on-cancel="handleCancel"
        @on-yes="handleYes"
        :dialogVisible="isAddToOrderDialogShown"
        :title="$t('modals.addItem.content')"
        :content="addItemConfirmationContent"
        :cancelTitle="$t('modals.addItem.actions.cancel')"
        :yesTitle="$t('modals.addItem.actions.yes')"
      />
    </el-main>
  </el-container>
</template>

<script>
import SelectFilter from "../components/filters/SelectFilter";
import ProductsTable from "../components/tables/ProductsTable";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";

export default {
  components: {
    SelectFilter,
    ProductsTable,
    ConfirmDialog
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
          label: this.$t("watches.tableColumns.country"),
          sortable: true
        },
        {
          prop: "quantity",
          label: this.$t("watches.tableColumns.quantity"),
          sortable: true
        },
        {
          prop: "rmc",
          label: this.$t("watches.tableColumns.rmc"),
          sortable: true
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
    },
    addItemConfirmationContent() {
      if (this.selectedWatch) {
        return `${this.$t("modals.addItem.content")} ${this.$t(
          "watches.descriptionWithPrice",
          {
            rmc: this.selectedWatch.rmc,
            price: this.selectedWatch.price
          }
        )}`;
      } else {
        return "";
      }
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
          this.countriesFilterList = data.map(watch => watch.country).sort();
          this.rmcsFilterList = data.map(watch => watch.rmc).sort();
        })
        .catch(err => {
          this.$notify({
            title: this.$t("notifications.loadItems.error.title"),
            message: this.$t("notifications.loadItems.error.message"),
            type: "error"
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
          title: this.$t("notifications.addItem.success.title"),
          message: this.$t("notifications.addItem.success.message"),
          type: "success"
        });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>