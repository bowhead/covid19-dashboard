<template>
    <card header-classes="bg_transparent" class="headaches">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0">{{ $t('dashboard.headaches') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ headache.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                {{ $t('dashboard.severe') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ severe }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                {{ $t('dashboard.mild') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ mild }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
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

if (process.env.NODE_ENV == 'production'){
    am4core.options.commercialLicense = true
}

am4core.useTheme(am4themes_material)

    export default {
        data() {
            return {
                chart: null,
                severe: 0,
                mild: 0,
                moderate: 0,
                colorLevels: [
                    {'level': 'severe', 'color': '#f57a6e'},
                    {'level': 'mild', 'color': '#285150'},
                    {'level': 'moderate', 'color': '#50cca8'},
                ]
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.headacheschart, am4charts.PieChart)

                this.chart.data = this.headache.Stats;

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

                let self = this

                if (this.headache.Stats)
                    colorSet.list = this.headache.Stats.map(function(item) {

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
            headache() {
                return this.$store.getters.getHeadachesStats
            }
        },
        watch: {
            headache: function(value) {
                this.mild = 0
                this.severe = 0
                this.moderate = 0
                value.Stats.forEach(item => {
                    switch(item.level) {
                        case 'mild':
                            this.mild = item.people
                            break;
                        case 'severe':
                            this.severe = item.people
                            break;
                        case 'moderate':
                            this.moderate = item.people
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