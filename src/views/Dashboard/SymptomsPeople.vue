<template>
    <card header-classes="bg_transparent" class="symptoms-people">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.peopleFeelIll') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ peopleFeelIll.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-7 option-tag">
                        <span class="dot-2"></span>
                        {{ $t('dashboard.headachesMild') }}
                    </div>
                    <div class="col-7 option-tag">
                        <span class="dot-6"></span>
                        {{ $t('dashboard.severeCough') }}
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-7 option-tag">
                        <span class="dot-7"></span>
                        {{ $t('dashboard.severeBodyAches') }}
                    </div>
                    <div class="col-7 option-tag">
                        <span class="dot-3"></span>
                        {{ $t('dashboard.mildCough') }}
                    </div>
                </div>
                <div class="row pt-1">
                    <div class="col-7 option-tag">
                        <span class="dot-5"></span>
                        {{ $t('dashboard.severeHeadaches') }}
                    </div>
                    <div class="col-7 option-tag">
                        <span class="dot-1"></span>
                        {{ $t('dashboard.moderateBodyAches') }}
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-8">
                <div class="symptoms-people-chart" ref="symptomspeoplechart"></div>
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
                mildHeadache: 0,
                dryCough: 0,
                severeBodyAches: 0,
                coughPhlegm: 0,
                severeHeadache: 0,
                moderateBodyAches: 0
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.symptomspeoplechart, am4charts.PieChart)

                this.chart.data = this.peopleFeelIll.Stats

                let pieSeries = this.chart.series.push(new am4charts.PieSeries())
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
                colorSet.list = ['#285150', '#50cca8', '#f57a6e', '#fdcccd', '#c0d7e0', '#acdcda'].map(function(color) {
                    return new am4core.color(color)
                })

                pieSeries.colors = colorSet
            }
        },
        mounted() {
            this.loadChart()
        },
        computed: {
            peopleFeelIll() {
                return this.$store.getters.getPeopleFeelIllStats
            }
        },
        watch: {
            peopleFeelIll: function(value) {
                value.Stats.forEach(item => {
                    switch(item.symptom) {
                        case 'dry cough"':
                            this.dryCough = item.people
                            break;
                        case 'moderate body aches':
                            this.moderateBodyAches = item.people
                            break;
                        case 'mild headaches':
                            this.mildHeadache = item.people
                            break;
                        case 'severe headaches':
                            this.severeHeadache = item.people
                            break;
                        case 'severe body aches':
                            this.severeBodyAches = item.people
                            break;
                        case 'productive with phlegm':
                            this.coughPhlegm = item.people
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
.symptoms-people .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.symptoms-people .people-reported {
    font-weight: 300;
    color: black;
}

.symptoms-people .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.symptoms-people .option-tag {
    font-size: 11px;
    color: black;
}

.symptoms-people-chart {
    height: 300px;
}
</style>