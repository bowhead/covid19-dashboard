<template>
    <card header-classes="bg_transparent" class="people-co-morbitidites">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.peopleCoMorbitidites') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ coMorbitidites.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                {{ $t('dashboard.asthma') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ asthma }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-6"></span>
                                {{ $t('dashboard.diabetes') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ diabetes }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-7"></span>
                                {{ $t('dashboard.obesity') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ obesity }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                {{ $t('dashboard.copd') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ copd }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-5"></span>
                                {{ $t('dashboard.hypertension') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ hypertension }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                {{ $t('dashboard.others') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ other }}
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
        data() {
            return {
                chart: null,
                asthma: 0,
                diabetes: 0,
                obesity: 0,
                copd: 0,
                hypertension: 0,
                other: 0
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.peoplecomorbitiditeschart, am4charts.PieChart)

                this.chart.data = this.coMorbitidites.Stats

                let pieSeries = this.chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'illness'
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
        },
        computed: {
            coMorbitidites() {
                return this.$store.getters.getPeopleCoMorbitiditesStats
            }
        },
        watch: {
            coMorbitidites: function(value) {
                value.Stats.forEach(item => {
                    switch(item.illness) {
                        case 'Asthma':
                            this.asthma = item.people
                            break;
                        case 'Diabetes':
                            this.diabetes = item.people
                            break;
                        case 'Obesity':
                            this.obesity = item.people
                            break;
                        case 'COPD':
                            this.copd = item.people
                        break;
                        case 'Hypertension':
                            this.hypertension = item.people
                        break;
                        case 'Other':
                            this.other = item.people
                        break;
                    }
                });

                this.loadChart()
                this.chart.invalidateRawData();
            }
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