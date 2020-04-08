import { Doughnut, mixins } from 'vue-chartjs';
import globalOptionsMixin from "@/components/Charts/globalOptionsMixin";

export default {
  name: 'doughnut-chart',
  extends: Doughnut,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props: {
    extraOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => {
    return {
      ctx: null,
      htmlLegend: null
    };
  },
  mounted() {
    // this.htmlLegend = this.generateLegend()
    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions);
        }
      },
      { immediate: true }
    );
  }
};
