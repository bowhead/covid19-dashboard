<template>
    <card header-classes="bg_transparent" class="people-feel-unwell">
        <div class="row" slot="header">
            <div class="col">
                <h5 class="h5 mb-0 title">{{ $t('dashboard.peopleFeelUnwell') }}</h5>
            </div>
        </div>

        <div class="row">
            <div class="col-15 col-md-6">
                <div class="row">
                    <div class="col-15 people-reported">
                        {{ $t('dashboard.peopleReported') }}
                    </div>
                    <div class="col-15 pt-1 number-people">
                        {{ peopleFeelUnwell.TotalPeopleReported }}
                    </div>
                </div>
                <div class="row">
                    <div class="col-15">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-2"></span>
                                {{ $t('dashboard.feelIll') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ feelIll }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-15">
                        <div class="row">
                            <div class="col-15 option-tag">
                                <span class="dot-1"></span>
                                {{ $t('dashboard.feelTired') }}
                            </div>
                            <div class="col-15 option-number-tag">
                                {{ feelTired }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-15 col-md-9">
                <div class="people-feel-unwell-chart" ref="peoplefeelunwellchart"></div>
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
                feelIll: 0,
                feelTired: 0,
            }
        },
        methods: {
            loadChart() {
                this.chart = am4core.create(this.$refs.peoplefeelunwellchart, am4charts.XYChart)

                this.chart.data = this.peopleFeelUnwell.Stats;

                let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis())
                categoryAxis.dataFields.category = "status"
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;

                let label = categoryAxis.renderer.labels.template
                label.wrap = true;
                label.fill = '#c6c7c8'
                label.maxWidth = 120
                label.fontSize = '11'

                let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())
                valueAxis.title.text = "Patients %";
                valueAxis.title.fontSize = '12'
                valueAxis.title.fill = '#c6c7c8'
                valueAxis.fill = '#c6c7c8'
                valueAxis.fontSize = '12'
                valueAxis.max = this.peopleFeelUnwell.TotalPeopleReported;

                var series = this.chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "people";
                series.dataFields.categoryX = "status";
                series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                
                var columnTemplate = series.columns.template;
                columnTemplate.propertyFields.fill = "color";
                columnTemplate.propertyFields.stroke = "color"
            }
        },
        mounted() {
            this.loadChart()
        },
        computed: {
            peopleFeelUnwell() {
                return this.$store.getters.getPeopleFeelUnwell
            }
        },
        watch: {
            peopleFeelUnwell: function(value) {
                this.feelIll = 0
                this.feelTired = 0
                value.Stats.forEach(item => {
                    switch(item.status) {
                        case 'Feel tired or exhausted':
                            this.feelTired = item.people
                            break;
                        case 'Feel ill':
                            this.feelIll = item.people
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
.people-feel-unwell .title {
    font-size: 85%;
}

.people-feel-unwell .card-body {
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 0;
}

.people-feel-unwell .people-reported {
    font-weight: 300;
    color: black;
}

.people-feel-unwell .number-people {
    font-weight: bolder;
    font-size: 30px;
    color: black;
}

.people-feel-unwell  .option-tag {
    font-size: 11px;
    color: black;
}

.people-feel-unwell .option-number-tag {
    color: black;
    font-weight: 500;
    font-size: 21px;
}

.people-feel-unwell-chart {
    height: 300px;
}
</style>