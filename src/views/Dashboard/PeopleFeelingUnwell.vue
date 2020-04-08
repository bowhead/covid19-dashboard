<template>
    <card header-classes="bg_transparent" class="people-feeling-unwell">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">Number of people reporting feeling unwell</h5>
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
        methods: {
            loadChart() {
                let chart = am4core.create(this.$refs.peoplefeelingunwellchart, am4charts.XYChart);

                chart.data = [
                    {
                        'date': 'March 21 2020',
                        'people': 5000
                    },
                    {
                        'date': 'March 22 2020',
                        'people': 5500
                    },
                    {
                        'date': 'March 23 2020',
                        'people': 6200
                    },
                    {
                        'date': 'March 24 2020',
                        'people': 7100
                    },
                    {
                        'date': 'March 25 2020',
                        'people': 8200
                    },
                    {
                        'date': 'March 26 2020',
                        'people': 9600
                    },
                    {
                        'date': 'March 27 2020',
                        'people': 11400
                    },
                    {
                        'date': 'March 28 2020',
                        'people': 13500
                    },
                    {
                        'date': 'March 29 2020',
                        'people': 15800
                    },
                    {
                        'date': 'March 30 2020',
                        'people': 18100
                    },
                    {
                        'date': 'March 31 2020',
                        'people': 21500
                    },
                    {
                        'date': 'April 1 2020',
                        'people': 24300
                    },
                    {
                        'date': 'April 2 2020',
                        'people': 29000
                    },
                    // {
                    //     'date': 'April 3 2020',
                    //     'people': 34200
                    // },
                    // {
                    //     'date': 'April 4 2020',
                    //     'people': 39700
                    // },
                    // {
                    //     'date': 'April 5 2020',
                    //     'people': 46000
                    // },
                    // {
                    //     'date': 'April 6 2020',
                    //     'people': 51900
                    // },
                    // {
                    //     'date': 'April 7 2020',
                    //     'people': 57300
                    // },
                    // {
                    //     'date': 'April 8 2020',
                    //     'people': 67000
                    // },
                    // {
                    //     'date': 'April 9 2020',
                    //     'people': 78300
                    // },
                    // {
                    //     'date': 'April 10 2020',
                    //     'people': 89500
                    // },
                    // {
                    //     'date': 'April 11 2020',
                    //     'people': 105000
                    // },
                    // {
                    //     'date': 'April 12 2020',
                    //     'people': 120300
                    // },
                    // {
                    //     'date': 'April 13 2020',
                    //     'people': 135700
                    // },
                    // {
                    //     'date': 'April 14 2020',
                    //     'people': 149300
                    // },
                    // {
                    //     'date': 'April 15 2020',
                    //     'people': 171100
                    // },
                    // {
                    //     'date': 'April 16 2020',
                    //     'people': 200750
                    // },
                    // {
                    //     'date': 'April 17 2020',
                    //     'people': 250600
                    // },
                    // {
                    //     'date': 'April 18 2020',
                    //     'people': 310300
                    // },
                    // {
                    //     'date': 'April 19 2020',
                    //     'people': 380200
                    // },
                    // {
                    //     'date': 'April 20 2020',
                    //     'people': 450900
                    // },
                    // {
                    //     'date': 'April 21 2020',
                    //     'people': 500120
                    // }
                ]

                // Create axes
                let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.grid.template.location = 0;
                dateAxis.renderer.minGridDistance = 10;
                dateAxis.renderer.labels.template.fill = '#c6c7c8'
                dateAxis.renderer.labels.template.fontSize = 10
                dateAxis.renderer.labels.template.rotation = -90;
                dateAxis.renderer.labels.template.horizontalCenter = 'left'
                dateAxis.renderer.labels.template.location = 0.5;

                // Create value axis
                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                // Create series
                let series = chart.series.push(new am4charts.LineSeries());
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