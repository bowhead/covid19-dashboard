<template>
    <card header-classes="bg_transparent" class="people-co-morbitidites">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">People who feel unwell & co-morbitidites</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        People reported
                    </div>
                    <div class="col-15 pt-1 number-people">
                        42,008
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                Asthma
                            </div>
                            <div class="col-15 option-number-tag">
                                12,974
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-6"></span>
                                Diabetes
                            </div>
                            <div class="col-15 option-number-tag">
                                5,093
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-7"></span>
                                Obesity
                            </div>
                            <div class="col-15 option-number-tag">
                                4,764
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                COPD
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
                                <span class="dot-5"></span>
                                Hypertension
                            </div>
                            <div class="col-15 option-number-tag">
                                2,947
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                Others
                            </div>
                            <div class="col-15 option-number-tag">
                                11,038
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-8">
                <div class="people-co-morbitidites-chart" ref="peoplecomorbitiditeschart"></div>
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
                let chart = am4core.create(this.$refs.peoplecomorbitiditeschart, am4charts.PieChart)

                chart.data = [
                    {
                        'illnes': 'Asthma',
                        'people': 12974
                    },
                    {
                        'illnes': 'Diabetes',
                        'people': 5093
                    },
                    {
                        'illnes': 'Obesity',
                        'people': 2764
                    },
                    {
                        'illnes': 'Hypertension',
                        'people': 2947
                    },
                    {
                        'illnes': 'COPD',
                        'people': 9803
                    },
                    {
                        'illnes': 'Others',
                        'people': 11038
                    }
                ]

                let pieSeries = chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'illnes'
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
                colorSet.list = ['#c0d7e0', '#acdcda', '#50cca8', '#f57a6e', '#285150', '#fdcccd'].map(function(color) {
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
.people-co-morbitidites .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.people-co-morbitidites .people-reported {
    font-weight: 300;
    color: black;
}

.people-co-morbitidites .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.people-co-morbitidites .option-tag {
    font-size: 10px;
    color: black;
}

.people-co-morbitidites .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.people-co-morbitidites-chart {
    height: 300px;
}
</style>