<template>
    <card header-classes="bg_transparent" class="people-tired">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0 title">{{ $t('dashboard.peopleTiredExhausted') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-7">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ howPeopleFeel.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                {{ $t('dashboard.feelWell') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ feelWell }}
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                {{ $t('dashboard.feelUnwell') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ feelUnwell }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="row">
                    <div class="col-7">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-3"></span>
                                {{ $t('dashboard.confirmed') }}
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
                                {{ $t('dashboard.suspected') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                3,863
                            </div>
                        </div>
                    </div>
                </div> -->
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

if (process.env.NODE_ENV == 'production'){
    am4core.options.commercialLicense = true
}

am4core.useTheme(am4themes_material)

    export default {
        data() {
            return {
                chart: null,
                feelWell: 0,
                feelUnwell: 0,
                colorFeels: [
                    {'feel': 'Feel well', 'color': '#50cca8'},
                    {'feel': 'Feel unwell', 'color': '#f57a6e'},
                ]
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.peopletiredchart, am4charts.PieChart)

                this.chart.data = this.howPeopleFeel.Stats

                let pieSeries = this.chart.series.push(new am4charts.PieSeries())
                pieSeries.dataFields.value = 'people'
                pieSeries.dataFields.category = 'feel'
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
                    .cursorOverStyle = [
                        {
                            "property": "cursor",
                            "value": "pointer"
                        }
                    ];
                
                let colorSet = new am4core.ColorSet();

                let self = this

                if (this.howPeopleFeel.Stats)
                    colorSet.list = this.howPeopleFeel.Stats.map(function(item) {

                        let index = self.colorFeels.map(function(x){ return x.feel }).indexOf(item.feel)

                        return new am4core.color(self.colorFeels[index].color)

                    })

                pieSeries.colors = colorSet
            }
        },
        mounted() {
            this.loadChart();
        },
        computed: {
            howPeopleFeel() {
                return this.$store.getters.getHowPeopleFeelStats
            }
        },
        watch: {
            howPeopleFeel: function(value) {
                this.feelWell = 0
                this.feelUnwell = 0
                value.Stats.forEach(item => {
                    switch(item.feel) {
                        case 'Feel well':
                            this.feelWell = item.people
                            break;
                        case 'Feel unwell':
                            this.feelUnwell = item.people
                            break;
                    }
                })

                this.loadChart()
                this.chart.invalidateRawData();   
            }
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