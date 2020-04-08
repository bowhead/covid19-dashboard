<template>
    <card header-classes="bg_transparent" class="people-tired">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0 title">Symptoms of people who feel tired or exhausted</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        People reported
                    </div>
                    <div class="col-15 pt-1 number-people">
                        12,638
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                Recovered
                            </div>
                            <div class="col-15 option-number-tag">
                                10,482
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                Deaths
                            </div>
                            <div class="col-15 option-number-tag">
                                2,174
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                Confirmed
                            </div>
                            <div class="col-15 option-number-tag">
                                25,482
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-4"></span>
                                Suspected
                            </div>
                            <div class="col-15 option-number-tag">
                                3,863
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-8">
                <div class="people-tired-chart" ref="peopletiredchart"></div>
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
                let chart = am4core.create(this.$refs.peopletiredchart, am4charts.PieChart)

                chart.data = [
                    {
                        'status': 'Recovered',
                        'people': 10482
                    },
                    {
                        'status': 'Confirmed',
                        'people': 25482
                    },
                    {
                        'status': 'Suspected',
                        'people': 3863
                    },
                    {
                        'status': 'Deaths',
                        'people': 2174
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
                colorSet.list = ['#50cca8', '#285150', '#7eadb3', '#f57a6e'].map(function(color) {
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
.people-tired .title {
    font-size: 85%;
}

.people-tired .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.people-tired .people-reported {
    font-weight: 300;
    color: black;
}

.people-tired .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.people-tired .option-tag {
    font-size: 11px;
    color: black;
}

.people-tired .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.people-tired-chart {
    height: 300px;
}
</style>