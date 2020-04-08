<template>
    <card header-classes="bg_transparent" class="headaches">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">Headaches</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        People reported
                    </div>
                    <div class="col-15 pt-1 number-people">
                        12,146
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                Severe
                            </div>
                            <div class="col-15 option-number-tag">
                                12,974
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                Mild
                            </div>
                            <div class="col-15 option-number-tag">
                                9,803
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                Moderate
                            </div>
                            <div class="col-15 option-number-tag">
                                11,038
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-8">
                <div class="headaches-chart" ref="headacheschart"></div>
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
                let chart = am4core.create(this.$refs.headacheschart, am4charts.PieChart)

                chart.data = [
                    {
                        'status': 'Moderate',
                        'people': 11038
                    },
                    {
                        'status': 'Mild',
                        'people': 9803
                    },
                    {
                        'status': 'Severe',
                        'people': 12974
                    }
                ]

                let pieSeries = chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'status'
                pieSeries.labels.template.disabled = false;
                
                pieSeries.ticks.template.disabled = true;
                pieSeries.alignLabels = false;
                pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
                pieSeries.labels.template.radius = am4core.percent(-40);
                pieSeries.labels.template.fill = am4core.color("white");

                pieSeries.labels.template.adapter.add("radius", function(radius, target) {
                    if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                        return 0;
                    }
                    return radius;
                });
                
                pieSeries.labels.template.adapter.add("fill", function(color, target) {
                    if (target.dataItem && (target.dataItem.values.value.percent < 10)) {
                        return am4core.color("#000");
                    }
                    return color;
                });

                pieSeries.slices.template.stroke = am4core.color("#fff");
                pieSeries.slices.template.strokeWidth = 2;

                pieSeries.slices.template
                    // change the cursor on hover to make it apparent the object can be interacted with
                    .cursorOverStyle = [
                        {
                            "property": "cursor",
                            "value": "pointer"
                        }
                    ];
                
                let colorSet = new am4core.ColorSet();
                colorSet.list = ['#f57a6e' ,'#50cca8', '#285150'].map(function(color) {
                    return new am4core.color(color)
                })

                pieSeries.colors = colorSet
            }
        },
        mounted() {
            this.loadChart()
        }   
    }
</script>

<style>
.headaches .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.headaches .people-reported {
    font-weight: 300;
    color: black;
}

.headaches .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.headaches .option-tag {
    font-size: 11px;
    color: black;
}

.headaches .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.headaches-chart {
    height: 300px;
}
</style>