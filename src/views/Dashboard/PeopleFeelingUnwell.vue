<template>
    <card header-classes="bg_transparent" class="people-feeling-unwell">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.peopleFeelingUnwell') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15">
                <div class="people-feeling-unwell-chart" ref="peoplefeelingunwellchart"></div>
            </div>
        </div>   
    </card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_material from "@amcharts/amcharts4/themes/material"

am4core.useTheme(am4themes_material)

    export default {
        data() {
            return {
                chart: null
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.peoplefeelingunwellchart, am4charts.XYChart);

                this.chart.data = this.peopleFeelingUnwell.Stats

                // Create axes
                let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.grid.template.location = 0;
                dateAxis.renderer.minGridDistance = 10;
                dateAxis.renderer.labels.template.fill = '#c6c7c8'
                dateAxis.renderer.labels.template.fontSize = 10
                dateAxis.renderer.labels.template.rotation = -90;
                dateAxis.renderer.labels.template.horizontalCenter = 'left'
                dateAxis.renderer.labels.template.location = 0.5;

                // Create value axis
                let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());

                // Create series
                let series = this.chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = "people";
                series.dataFields.dateX = "date";
                series.tooltipText = "{people}"
                series.strokeWidth = 1;
                series.tensionX = 1;
                series.connect = false;


                // Make bullets grow on hover
                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.strokeWidth = 0;
                bullet.circle.radius = 4;
                bullet.circle.fill = am4core.color("#f57a6e");

                var bullethover = bullet.states.create("hover");
                bullethover.properties.scale = 1.3;
                //chart.cursor = new am4charts.XYCursor();
            }
        },
        mounted() {
            this.loadChart()
        },
        computed: {
            peopleFeelingUnwell() {
                return this.$store.getters.getPeopleFeelingUnwell
            }
        },
        watch: {
            peopleFeelingUnwell: function(value) {
                this.loadChart()
                this.chart.invalidateRawData();
            }
        }
    }
</script>

<style>
.people-feeling-unwell .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.people-feeling-unwell-chart {
    height: 300px;
}
</style>