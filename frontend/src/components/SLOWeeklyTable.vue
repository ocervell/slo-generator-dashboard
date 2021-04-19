<template>
  <div
    class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto fluid"
    :class="show ? '' : 'hidden'"
  >
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { slos } from "../hooks/api";
import { sloMixin, fmtMixin, queryMixin } from "../hooks/shared";
import SLOCard from "../components/SLOCard.vue";
import Loader from "../components/Loader.vue";
import StatusIcon from "../components/icons/StatusIcon.vue";

export default defineComponent({
  data() {
    return {
      sloData: [],
      input: "",
      offset: 0,
      limit: 50,
      count: 0,
      loading: true,
      show: true,
      enableFilterKey: true,
      filterKeyResponse: [],
      filterValueResponse: [],
      params: {},
      columns: [],
    };
  },
  mounted() {
    this.params = this.$route.query;
    this.reloadData();
  },
  methods: {
    async reloadData() {
      this.sloData = [];
      this.getRecordsCount();
      this.loading = true;
      var queryString = this.getQueryString();
      slos
        .getLastReport(queryString, this.offset, this.limit)
        .then((resJson) => {
          this.sloData = resJson;
          this.loading = false;
        });
    },
    async getRecordsCount() {
      slos
        .getLastReportCount()
        .then((resJson) => (this.count = resJson[0].count));
    },
  },
  watch: {
    params: {
      handler() {
        this.updateQueryString();
        this.reloadData();
      },
      deep: true,
    },
    input: function (query) {
      if (query == "") {
        this.enableFilterKey = true;
        return;
      }
      if (this.enableFilterKey) {
        slos.getKeys(query).then((resJson) => {
          this.filterKeyResponse = resJson;
        });
      } else {
        slos.getValues(query).then((resJson) => {
          this.filterValueResponse = resJson;
        });
      }
    },
  },
  mixins: [queryMixin, sloMixin, fmtMixin],
  components: {
    SLOCard,
    Loader,
    StatusIcon,
  },
});
</script>
