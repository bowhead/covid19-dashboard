<template>
    <card header-classes="bg_transparent" class="cough">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.cough') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ cough.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                Dry
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ dry }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="row option-tag">
                            <div class="col-15">
                                <span class="dot-3"></span>
                                Productive with phlegm
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ phlegm }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                {{ $t('dashboard.moderate') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ moderate }}
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="col-15 col-md-8">
                <div class="cough-chart" ref="coughchart"></div>
            </div>
        </div>
    </card>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_material from "@amcharts/amcharts4/themes/material"

if (process.env.NODE_ENV == 'production'){
    am4core.options.commercialLicense = true
}

am4core.useTheme(am4themes_material)

    export default {
        data() {
            return {
                chart: null,
                phlegm: 0,
                dry: 0,
                colorLevels: [
                    {'level': 'dry', 'color': '#50cca8'},
                    {'level': 'productive with phlegm', 'color': '#285150'},
                ]
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.coughchart, am4charts.PieChart)

                this.chart.data = this.cough.Stats

                let pieSeries = this.chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'level'
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
                // colorSet.list = ['#50cca8', '#285150', '#f57a6e'].map(function(color) {
                //     return new am4core.color(color)
                // })

                let self = this

                if (this.cough.Stats)
                    colorSet.list = this.cough.Stats.map(function(item) {

                        let index = self.colorLevels.map(function(x){ return x.level }).indexOf(item.level)

                        return new am4core.color(self.colorLevels[index].color)

                    })

                pieSeries.colors = colorSet
            }
        },
        mounted() {
            this.loadChart()
        },
        computed: {
            cough() {
               return this.$store.getters.getCoughStats
            }
        },
        watch: {
            cough: function(value) {
                this.dry = 0
                this.phlegm = 0
                value.Stats.forEach(item => {
                    switch(item.level) {
                        case 'dry':
                            this.dry = item.people
                            break;
                        case 'productive with phlegm':
                            this.phlegm = item.people
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
.cough .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.cough .people-reported {
    font-weight: 300;
    color: black;
}

.cough .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.cough .option-tag {
    font-size: 11px;
    color: black;
}

.cough .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.cough-chart {
    height: 300px;
}
</style>