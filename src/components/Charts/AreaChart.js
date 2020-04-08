import { Area, mixins, Bar } from 'vue-chartjs';
import globalOptionsMixin from '@/components/Charts/globalOptionsMixin';

export default {
  name: 'area-chart',
  extends: Area,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props: {
    extraOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ctx: null
    };
  },
  mounted() {
    this.$watch(
      'chartData',
      (newVal, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions)
        }
      },
      { immediate: true }
    );
  }
}