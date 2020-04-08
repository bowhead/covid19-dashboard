<template>
    <card header-classes="bg_transparent" class="people-have-fever">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">People who have a self-reported fever</h5>
            </div>
        </div>

        <div class="row">
            <div class="offset-10 col-1">
                <label for="">Fº</label>
            </div>
            <div class="offset-0 col-1">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1">
                    <label class="custom-control-label" for="customSwitch1"></label>
                </div>             
            </div>
            <div class="offset-1 col-1">
                <label for="">Cº</label>
            </div>
            <div class="col-15">
                <div class="people-have-fever-chart" ref="peoplehavefeverchart"></div>
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
        methods: {
            loadChart() {
                let chart = am4core.create(this.$refs.peoplehavefeverchart, am4charts.XYChart);

                chart.data = [
                    {
                        'date': 'March 21 2020',
                        'temperature': '38'
                    },
                    {
                        'date': 'March 22 2020',
                        'temperature': '36.7'
                    },
                    {
                        'date': 'March 23 2020',
                        'temperature': '39.1'
                    },
                    {
                        'date': 'March 24 2020',
                        'temperature': '40'
                    },
                    {
                        'date': 'March 25 2020',
                        'temperature': '38.5'
                    },
                    {
                        'date': 'March 26 2020',
                        'temperature': '39'
                    },
                    {
                        'date': 'March 27 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'March 28 2020',
                        'temperature': '35.5'
                    },
                    {
                        'date': 'March 29 2020',
                        'temperature': '37.3'
                    },
                    {
                        'date': 'March 30 2020',
                        'temperature': '38.5'
                    },
                    {
                        'date': 'March 31 2020',
                        'temperature': '37.6'
                    },
                    {
                        'date': 'April 1 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'April 2 2020',
                        'temperature': '36.2'
                    },
                    {
                        'date': 'April 3 2020',
                        'temperature': '39'
                    },
                    {
                        'date': 'April 4 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'April 5 2020',
                        'temperature': '37.9'
                    },
                    {
                        'date': 'April 6 2020',
                        'temperature': '37.2'
                    },
                    {
                        'date': 'April 7 2020',
                        'temperature': '38.5'
                    },
                    {
                        'date': 'April 8 2020',
                        'temperature': '38'
                    },
                    {
                        'date': 'April 9 2020',
                        'temperature': '39'
                    },
                    {
                        'date': 'April 10 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'April 11 2020',
                        'temperature': '36.5'
                    },
                    {
                        'date': 'April 12 2020',
                        'temperature': '37.8'
                    },
                    {
                        'date': 'April 13 2020',
                        'temperature': '39.2'
                    },
                    {
                        'date': 'April 14 2020',
                        'temperature': '37.5'
                    },
                    {
                        'date': 'April 15 2020',
                        'temperature': '36.5'
                    },
                    {
                        'date': 'April 16 2020',
                        'temperature': '36'
                    },
                    {
                        'date': 'April 17 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'April 18 2020',
                        'temperature': '38'
                    },
                    {
                        'date': 'April 19 2020',
                        'temperature': '36.3'
                    },
                    {
                        'date': 'April 20 2020',
                        'temperature': '37'
                    },
                    {
                        'date': 'April 21 2020',
                        'temperature': '38'
                    }
                ]

                chart.numberFormatter.numberFormat = "#.#'º'";

                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.dataFields.category = "date";
                categoryAxis.renderer.minGridDistance = 15;
                categoryAxis.renderer.labels.template.fill = '#c6c7c8'
                categoryAxis.renderer.labels.template.fontSize = 10
                categoryAxis.renderer.grid.template.location = 0.5;
                categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
                categoryAxis.renderer.labels.template.rotation = -90;
                categoryAxis.renderer.labels.template.horizontalCenter = "left";
                categoryAxis.renderer.labels.template.location = 0.5;

                categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
                    return -target.maxRight / 2;
                })

                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                valueAxis.renderer.ticks.template.disabled = true;
                valueAxis.renderer.axisFills.template.disabled = true;

                let series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.categoryX = "date";
                series.dataFields.valueY = "temperature";
                series.tooltipText = "{valueY.value}";
                series.sequencedInterpolation = true;
                series.fillOpacity = 0;
                series.strokeOpacity = 1;
                series.strokeDashArray = "1,3";
                series.columns.template.width = 0.03;
                series.stroke = '#50cca8'
                series.fill = '#50cca8'
                series.tooltip.pointerOrientation = "horizontal";

                let bullet = series.bullets.create(am4charts.CircleBullet);
                bullet.fill = '#f57a6e'
                bullet.stroke = '#f57a6e'

                var series2 = chart.series.push(new am4charts.LineSeries());
                series2.stroke = '#f57a6e';
                series2.strokeWidth = 1.5;
                series2.dataFields.valueY = "temperature";
                series2.dataFields.categoryX = "date";
            }
        },
        mounted() {
            this.loadChart()
        }
    }
</script>

<style>
.people-have-fever .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.people-have-fever-chart {
    height: 270px;
}
</style>