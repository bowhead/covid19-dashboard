import { mixins, HorizontalBar } from 'vue-chartjs';
import globalOptionsMixin from '@/components/Charts/globalOptionsMixin';

export default {
  name: 'horizontal-bar-chart',
  extends: HorizontalBar,
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
  methods: {
    renderHorizontalChart: function() {
      this.renderChart(this.chartData, this.extraOptions)
    }
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
  },
}