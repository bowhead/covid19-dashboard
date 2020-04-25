<template>
    <card header-classes="bg_transparent" class="general-symptoms">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.generalSymptoms') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ generalSymptoms.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                {{ $t('dashboard.cough') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ cough }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-6"></span>
                                {{ $t('dashboard.aches') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ aches }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-15">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                {{ $t('dashboard.shortness') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ breath }}
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
        data() {
            return {
                chart: null,
                cough: 0,
                aches: 0,
                breath: 0,
                colorSymptoms: [
                    {'symptom': 'Cough', 'color': '#f57a6e'},
                    {'symptom': 'Aches', 'color': '#acdcda'},
                    {'symptom': 'Shortness of breath', 'color': '#50cca8'},
                ]
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.generalsymptomschart, am4charts.PieChart)

                this.chart.data = this.generalSymptoms.Stats

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

                let self = this

                if (this.generalSymptoms.Stats)
                    colorSet.list = this.generalSymptoms.Stats.map(function(item) {

                        let index = self.colorSymptoms.map(function(x){ return x.symptom }).indexOf(item.symptom)

                        return new am4core.color(self.colorSymptoms[index].color)

                    })

                pieSeries.colors = colorSet
            }        
        },
        mounted() {
            this.loadChart();
        },
        computed: {
            generalSymptoms() {
                return this.$store.getters.getGeneralSymptomsStats
            }
        },
        watch: {
            generalSymptoms: function(value) {
                this.cough = 0
                this.aches = 0
                this.breath = 0
                value.Stats.forEach(item => {
                    switch(item.symptom) {
                        case 'Cough':
                            this.cough = item.people
                            break;
                        case 'Aches':
                            this.aches = item.people
                            break;
                        case 'Shortness of breath':
                            this.breath = item.people
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