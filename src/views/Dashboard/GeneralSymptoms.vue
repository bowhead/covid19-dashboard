<template>
    <card header-classes="bg_transparent" class="general-symptoms">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">General Symptoms</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        People reported
                    </div>
                    <div class="col-15 pt-1 number-people">
                        39,572
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                Cough
                            </div>
                            <div class="col-15 option-number-tag">
                                21,019
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-6"></span>
                                Aches
                            </div>
                            <div class="col-15 option-number-tag">
                                5,946
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-15">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                Shortness of breath
                            </div>
                            <div class="col-15 option-number-tag">
                                13,428
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-8">
                <div class="general-symptoms-chart" ref="generalsymptomschart"></div>
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
                let chart = am4core.create(this.$refs.generalsymptomschart, am4charts.PieChart)

                chart.data = [
                    {
                        'symptom': 'Cough',
                        'people': 21019
                    },
                    {
                        'symptom': 'shortness of breath',
                        'people': 13428
                    },
                    {
                        'symptom': 'Aches',
                        'people': 5946
                    }
                ]

                let pieSeries = chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'symptom'
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
                pieSeries.slices.template.strokeWidth = 1;

                pieSeries.slices.template
                    // change the cursor on hover to make it apparent the object can be interacted with
                    .cursorOverStyle = [
                        {
                            "property": "cursor",
                            "value": "pointer"
                        }
                    ];
                
                let colorSet = new am4core.ColorSet();
                colorSet.list = ['#f57a6e', '#50cca8', '#acdcda'].map(function(color) {
                    return new am4core.color(color)
                })

                pieSeries.colors = colorSet
            }        
        },
        mounted() {
            this.loadChart();
        }
    }
</script>

<style>
.general-symptoms .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.general-symptoms .people-reported {
    font-weight: 300;
    color: black;
}

.general-symptoms .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.general-symptoms  .option-tag {
    font-size: 11px;
    color: black;
}

.general-symptoms .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.general-symptoms-chart {
    height: 300px;
}
</style>