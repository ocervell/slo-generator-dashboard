<template>
  <div
    class="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto fluid"
    v-bind="$attrs"
  >
    <!-- Filters -->
    <div class="flex flex-wrap gap-1 pb-2">
      <!-- Add filter input -->
      <div class="flex flex-wrap gap-1">
        <div class="justify-center relative text-gray-500">
          <!-- Input box -->
          <div
            class="px-2 py-2 flex items-center text-sm text-gray-200 bg-gray-900 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 22 22"
              class="h-4 w-4"
              stroke="white"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <input
              v-model="input"
              class="pl-2 border border-transparent bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Add filter ..."
            />
          </div>

          <!-- Context menu for filter keys -->
          <div class="text-gray-500 text-xs text-semibold">
            <ul class="px-5 absolute">
              <li
                v-on:click="
                  enableFilterKey = false;
                  filterKeyResponse = [];
                  input = choice;
                "
                v-for="choice in filterKeyResponse"
                :key="choice"
                class="px-2 py-2 bg-gray-900 cursor-pointer border-t-2 border-gray-800 hover:bg-yellow-50 hover:text-red-500"
              >
                {{ choice }}
              </li>
            </ul>

            <!-- Context menu for filter values -->
            <ul class="px-5 absolute">
              <li
                v-on:click="
                  params[input] = choice;
                  filterValueResponse = [];
                  input = '';
                  enableFilterKey = true;
                "
                v-for="choice in filterValueResponse"
                :key="choice"
                class="px-2 py-2 bg-gray-900 cursor-pointer border-t-2 border-gray-800 hover:bg-yellow-50 hover:text-red-500"
              >
                <div v-if="input == 'window'">
                  {{ fmtTime(choice) }}
                </div>
                <div v-else>
                  {{ choice }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Active filters -->
      <div class="flex flex-wrap gap-1 pb-2">
        <div
          class="px-2 py-2 flex items-center text-sm text-gray-200 bg-gray-900 rounded-full"
          v-for="(value, index) in params"
          :key="index"
        >
          <span class="px-1 font-semibold">{{ index }}:</span>
          <span class="pr-1">{{ value }}</span>
          <svg
            v-on:click="delete params[index]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
            class="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="inline-block min-w-full shadow rounded-lg overflow-hidden bg-gray-800"
    >
      <table class="min-w-max w-full table-auto">
        <!-- Table headers -->
        <thead>
          <tr
            class="bg-gray-900 text-gray-200 uppercase text-sm leading-normal"
          >
            <th class="px-2 py-4 text-left"></th>
            <th class="px-2 py-4 text-left">Description</th>
            <th class="px-2 py-4 text-left">Measurement</th>
            <th class="px-2 py-4 text-left">Name</th>
            <th class="px-2 py-4 text-left">Window</th>
            <th class="px-2 py-4 text-left">Metadata</th>
            <th class="px-2 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="text-gray-200 text-sm font-light">
          <Loader :loading="loading" text="Loading data ..." />

          <!-- Rows -->
          <tr
            v-for="(report, index) in sloData"
            :key="index"
            class="border-b border-gray-600 bg-gray-800 hover:bg-gray-70"
          >
            <!-- Warning / Check -->
            <td class="px-4">
              <StatusIcon :alert="report.alert" />
            </td>

            <!-- SLO Description -->
            <td class="px-2 text-left font-semibold max-w-xs">
              {{ report.slo_description }}
            </td>

            <!-- SLO -->
            <td class="px-2">
              <SLOCard
                class="grid grid-cols-1 xl:grid-cols-2 gap-1"
                :sli="report.sli_measurement"
                :slo="report.slo_target"
                :gap="report.gap"
                :good_events="report.good_events_count"
                :bad_events="report.bad_events_count"
                :burn_rate="report.error_budget_burn_rate"
                :burn_rate_threshold="report.alerting_burn_rate_threshold"
              />
            </td>

            <!-- SLO Name -->
            <td class="px-2 text-left whitespace-pre max-w-xs">
              <div class="text-md flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-4 w-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div v-on:click="params['slo_name'] = report.slo_name">
                  {{ report.slo_name }}
                </div>
              </div>
            </td>

            <!-- Window -->
            <td class="px-2 text-left max-w-xs whitespace-pre">
              <div
                v-on:click="params['window'] = fmtTime(report.window)"
                class="text-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 22 22"
                  class="h-4 w-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  {{ fmtTime(report.window) }}
                </div>
              </div>
            </td>

            <!-- Metadata labels -->
            <td class="px-2 py-4 text-xs max-w-xs">
              <div class="flex flex-wrap gap-2">
                <div
                  v-on:click="params['service_name'] = report.service_name"
                  class="px-1 py-1 flex items-center text-gray-200 bg-gray-500 bg-opacity-25 rounded-full"
                >
                  <span class="px-1 font-semibold">service:</span>
                  <span class="pr-1">{{ report.service_name }}</span>
                </div>
                <div
                  v-on:click="params['feature_name'] = report.feature_name"
                  class="px-1 py-1 flex items-center text-gray-200 bg-gray-500 bg-opacity-25 rounded-full"
                >
                  <span class="px-1 font-semibold">feature:</span>
                  <span class="pr-1">{{ report.feature_name }}</span>
                </div>
                <div
                  class="px-1 py-1 flex items-center text-gray-200 bg-gray-500 bg-opacity-25 rounded-full"
                  v-for="(element, index) in JSON.parse(report.metadata)"
                  :key="index"
                  v-on:click="params['metadata.' + element.key] = element.value"
                >
                  <span class="px-1 font-semibold">{{ element.key }}:</span>
                  <span class="pr-1">{{ element.value }}</span>
                </div>
              </div>
            </td>

            <!-- Actions -->
            <td class="px-2 text-xs">
              <div class="flex item-center justify-center">
                <!-- View icon -->
                <div
                  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                >
                  <svg
                    v-on:click="navigateSLO(report, 'view')"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>

                <!-- Edit icon -->
                <div
                  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                >
                  <svg
                    v-on:click="navigateSLO(report, 'edit')"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </div>

                <!-- Remove icon -->
                <div
                  class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                >
                  <svg
                    v-on:click="navigateSLO(report, 'remove')"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Table footer -->
      <div
        v-if="!loading"
        class="px-5 py-5 bg-gray-800 text-gray-200 flex flex-col xs:flex-row items-center xs:justify-between"
      >
        <!-- Table footer text -->
        <span v-if="count < offset + limit" class="text-xs xs:text-sm">
          Showing query results {{ offset + 1 }} to
          {{ offset + sloData.length }}
        </span>
        <span v-else class="text-xs xs:text-sm">
          Showing query results {{ offset + 1 }} to
          {{ offset + sloData.length }}
        </span>

        <!-- Footer buttons -->
        <div class="inline-flex mt-2 xs:mt-0">
          <!-- Previous button -->
          <button
            v-if="offset > 0"
            v-on:click="
              offset -= limit;
              reloadData();
            "
            class="text-sm bg-gray-800 hover:bg-gray-600 border font-semibold px-4 rounded-full"
          >
            Previous
          </button>

          <!-- Next button -->
          <button
            v-else
            v-on:click="
              offset += limit;
              reloadData();
            "
            class="text-sm bg-gray-800 hover:bg-gray-600 border font-semibold py-2 px-4 rounded-full"
          >
            Next
          </button>
        </div>
      </div>
    </div>
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

