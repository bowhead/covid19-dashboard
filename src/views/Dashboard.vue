<template>
    <div>
        <base-header
        type="secondary"
        class="pb-6 pb-8 pt-md-1">
            <div class="row">
                <div class="col-15 col-md-2 pt-3">
                    <date-picker :placeholder="$t('filters.dateStart')" v-model="dateFrom" :config="options"></date-picker>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <date-picker :placeholder="$t('filters.dateEnd')" v-model="dateTo" :config="options"></date-picker>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="countrySelected"
                    label="label" 
                    :placeholder="$t('filters.country')" 
                    :options="countries"
                    track-by="code" 
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="stateSelected"
                    label="en" 
                    :placeholder="$t('filters.state')" 
                    :options="states"
                    track-by="provinceCode" 
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="genderSelected"
                    :placeholder="$t('filters.gender')" 
                    :options="gendersOrder"
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                 <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="ageRangeSelected"
                    :placeholder="$t('filters.age')" 
                    :options="agesOrder" 
                    open-direction="bottom" 
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-3 pt-3">
                    <base-button @click="addFilter" type="primary" class="add-filter">
                       {{ $t('filters.add') }}
                        <i class="fas fa-plus"></i>
                    </base-button>
                </div>
            </div>
            <div class="row">
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="symptomSelected"
                    label="symptom"
                    :placeholder="$t('filters.symptoms')" 
                    :options="symptoms"
                    track-by="question"
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="smokerSelected" 
                    label="label" 
                    :placeholder="$t('filters.smoker')" 
                    :options="smokerOrder"
                    track-by="value"
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="covidTestSelected" 
                    label="label" 
                    :placeholder="$t('filters.covidTest')" 
                    :options="covidTestOrder"
                    track-by="value" 
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect v-model="seeDoctorSelected"
                    label="label" 
                    :placeholder="$t('filters.seeDoctor')" 
                    :options="seeDoctorOrder"
                    track-by="value" 
                    open-direction="bottom"
                    :show-labels="false">
                    </multiselect>
                </div>
                <div class="offset-0 col-15 offset-md-4 col-md-3 pt-3">
                    <base-button type="primary" class="clear-filter" @click="clearFilters">
                        {{ $t('filters.clear') }}
                        <i class="fas fa-trash"></i>
                    </base-button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-15 col-md-12">
                    <label class="tag" v-for="(tag, index) in tags" :key="index">{{ tag.label }} <span @click="removeFilter(tag)">x</span> </label>
                </div>
                <div class="col-15 col-md-3">
                    <base-button type="default" class="search" @click="search">
                        {{ $t('filters.search') }}
                        <i class="fas fa-search fa-flip-horizontal"></i>
                    </base-button>
                </div>
            </div>
        </base-header>
        
        <div class="container-fluid mt--7 main-dashboard">
            <div class="row">
                <div class="col-15">
                    <covid-map></covid-map>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-15 col-md-5">
                    <people-tired></people-tired>
                </div>
                <div class="col-15 col-md-5">
                    <people-feel-unwell></people-feel-unwell>
                </div>
                <div class="col-15 col-md-5">
                    <general-symptoms></general-symptoms>
                </div>
            </div>
            <div class="row mt-3">
                <!-- <div class="col-15 col-md-5">
                    <people-have-fever></people-have-fever>
                </div> -->
                <div class="col-15 col-md-5">
                    <people-feeling-unwell></people-feeling-unwell>
                </div>
                <div class="col-15 col-md-5">
                    <people-co-morbitidites></people-co-morbitidites>
                </div>
                <div class="col-15 col-md-5">
                    <cough></cough>
                </div>
            </div>
            <div class="row mt-3">
                
                <div class="col-15 col-md-5">
                    <headaches></headaches>
                </div>
                <div class="col-15 col-md-5">
                    <body-aches></body-aches>
                </div>
                <div class="col-15 col-md-5">
                    <symptom-people></symptom-people>
                </div>
            </div>
            <!-- <div class="col-15 col-md-5">
                    <symptom-people></symptom-people>
                </div> -->
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import datePicker from 'vue-bootstrap-datetimepicker'

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

import CovidMap from './Dashboard/CovidMap'
import PeopleTired from './Dashboard/PeopleTired'
import PeopleFeelUnwell from './Dashboard/PeopleFeelUnwell'
import GeneralSymptoms from './Dashboard/GeneralSymptoms'
import PeopleHaveFever from './Dashboard/PeopleHaveFever'
import PeopleFeelingUnwell from './Dashboard/PeopleFeelingUnwell'
import PeopleCoMorbitidites from './Dashboard/PeopleCoMorbitidites'
import Cough from './Dashboard/Cough'
import Headaches from './Dashboard/Headaches'
import BodyAches from './Dashboard/BodyAches'
import SymptomPeople from './Dashboard/SymptomsPeople'

export default {
    components: {
        Multiselect,
        datePicker,
        CovidMap,
        PeopleTired,
        PeopleFeelUnwell,
        GeneralSymptoms,
        PeopleHaveFever,
        PeopleFeelingUnwell,
        PeopleCoMorbitidites,
        Cough,
        Headaches,
        BodyAches,
        SymptomPeople
    },
    data() {
        return {
            dateFrom: '',
            dateTo: '',
            symptomSelected: '',
            countrySelected: null,
            stateSelected: null,
            ageRangeSelected: '',
            genderSelected: '',
            seeDoctorSelected: null,
            smokerSelected: null,
            covidTestSelected: null,
            options: {
                format: 'YYYY-MM-DD',
                useCurrent: false,
            }, 
            tags: [],
            seeDoctorOptionsSelected: [],
            covidTestOptionsSelected: [],
            smokerOptionsSelected: [],
            symptomsSelected: [],
            agesRangeSelected: [],
            gendersSelected: [],
            statesSelected: [],
            countriesSelected: []
        }
    },
    methods: {
        search: function() {
            let filters = [];

            if (this.dateFrom !== '') {
                filters.push('from=' + this.dateFrom)
            }

            if (this.dateTo !== '') {
                filters.push('to=' + this.dateTo)
            }

            if(this.symptomsSelected && this.symptomsSelected.length) {
                for (let i=0; i < this.symptomsSelected.length; i++) {
                    filters.push('symptoms[]=' + this.symptomsSelected[i])
                }
            }

            if(this.statesSelected && this.statesSelected.length) {
                for (let i=0; i < this.statesSelected.length; i++) {
                    filters.push('states[]=' + this.statesSelected[i])
                }
            }

            if(this.countriesSelected && this.countriesSelected.length) {
                for (let i=0; i < this.countriesSelected.length; i++) {
                    filters.push('countries[]=' + this.countriesSelected[i])
                }
            }

            if(this.gendersSelected && this.gendersSelected.length) {
                for (let i=0; i < this.gendersSelected.length; i++) {
                    filters.push('genders[]=' + this.gendersSelected[i])
                }
            }

            if(this.agesRangeSelected && this.agesRangeSelected.length) {
                for (let i=0; i < this.agesRangeSelected.length; i++) {
                    filters.push('ages[]=' + this.agesRangeSelected[i])
                }
            }

            if(this.smokerOptionsSelected && this.smokerOptionsSelected.length) {
                for (let i=0; i < this.smokerOptionsSelected.length; i++) {
                    filters.push('smoker[]=' + this.smokerOptionsSelected[i])
                }
            }

            if(this.covidTestOptionsSelected && this.covidTestOptionsSelected.length) {
                for (let i=0; i < this.covidTestOptionsSelected.length; i++) {
                    filters.push('covidTest[]=' + this.covidTestOptionsSelected[i])
                }
            }

            if(this.seeDoctorOptionsSelected && this.seeDoctorOptionsSelected.length) {
                for (let i=0; i < this.seeDoctorOptionsSelected.length; i++) {
                    filters.push('seeDoctor[]=' + this.seeDoctorOptionsSelected[i])
                }
            }

            this.$store.dispatch('getStats', filters)
        },
        addFilter: function() {
            if (this.ageRangeSelected !== '') {
                let index = this.agesRangeSelected.indexOf(this.ageRangeSelected)
                if (index === -1)
                    this.agesRangeSelected.push(this.ageRangeSelected)
                this.addTag(this.ageRangeSelected, this.agesRangeSelected, 'age')
                this.ageRangeSelected = ''
            }

            if (this.genderSelected !== '') {
                let index = this.gendersSelected.indexOf(this.genderSelected)
                if (index === -1)
                    this.gendersSelected.push(this.genderSelected)
                this.addTag(this.genderSelected, this.genderSelected, 'gender')
                this.genderSelected = ''
            }
            
            if (this.seeDoctorSelected !== null) {
                this.addSeeDoctorSelected(this.seeDoctorSelected)
                this.addTag(this.seeDoctorSelected.value, this.seeDoctorSelected.code, 'doctor')
                this.seeDoctorSelected = null
            }

            if (this.smokerSelected !== null) {
                this.addSmokerSelected(this.smokerSelected)
                this.addTag(this.smokerSelected.value, this.smokerSelected.code, 'smoker')
                this.smokerSelected = null       
            }

            if (this.covidTestSelected !== null) {
                this.addCovidTestSelected(this.covidTestSelected)
                this.addTag(this.covidTestSelected.value, this.covidTestSelected.code, 'test')
                this.covidTestSelected = null           
            }

            if (this.stateSelected !== null) {
                this.addStateSelected(this.stateSelected)
                this.addTag(this.stateSelected.en, this.stateSelected.provinceCode, 'state')
                this.stateSelected = null
                this.$store.commit('ADD_STATES', null)
            }

            if (this.countrySelected !== null) {
                this.addCountrySelected(this.countrySelected)
                this.addTag(this.countrySelected.label, this.countrySelected.code, 'country')
                this.countrySelected = null
                this.$store.commit('ADD_STATES', null)
            }

            if (this.symptomSelected !== '') {
                this.addSymptomSelected(this.symptomSelected)
                this.addTag(this.symptomSelected.symptom, this.symptomSelected.question, 'symptom')
                this.symptomSelected = ''      
            }
        },
        addTag: function(tag, code, type) {

            let item = {
                'label': tag,
                'code': code,
                'type': type
            }

            let index = this.tags.map(function(x){ return x.code }).indexOf(item.code)

            if (index === -1) {
                this.tags.push(item)
            }
        },
        removeFilter: function(item) {
            let position = 0
            switch(item.type) {
                case 'age': 
                    position = this.agesRangeSelected.indexOf(item.code)
                    this.agesRangeSelected.splice(position, 1)
                    break;
                case 'gender':
                    position = this.gendersSelected.indexOf(item.code)
                    this.gendersSelected.splice(position, 1)
                    break;
                case 'doctor':
                    position = this.seeDoctorOptionsSelected.indexOf(item.code)
                    this.seeDoctorOptionsSelected.splice(position, 1)
                    break;
                case 'smoker':
                    position = this.smokerOptionsSelected.indexOf(item.code)
                    this.smokerOptionsSelected.splice(position, 1)
                    break;
                case 'test':
                    position = this.covidTestOptionsSelected.indexOf(item.code)
                    this.covidTestOptionsSelected.splice(position, 1)
                    break;
                case 'country':
                    position = this.countriesSelected.indexOf(item.code)
                    this.countriesSelected.splice(position, 1)
                    break;
                case 'state':
                    position = this.statesSelected.indexOf(item.code)
                    this.statesSelected.splice(position, 1)
                    break;  
                case 'symptom':
                    position = this.symptomsSelected.indexOf(item.code)
                    this.symptomsSelected.splice(position, 1)
                    break; 
            }

            let index = this.tags.indexOf(item)
            this.tags.splice(index, 1)
        },
        clearFilters: function() {
            this.tags = []
        },
        addSeeDoctorSelected: function(option) {
            let index = this.seeDoctorOptionsSelected.indexOf(option.code)

            if (index === -1) {
                this.seeDoctorOptionsSelected.push(option.code)
            }
        },
        addCovidTestSelected: function(option) {
            let index = this.covidTestOptionsSelected.indexOf(option.code)

            if (index === -1) {
                this.covidTestOptionsSelected.push(option.code)
            }        
        },
        addSmokerSelected: function(option) {
            let index = this.smokerOptionsSelected.indexOf(option.code)

            if (index === -1) {
                this.smokerOptionsSelected.push(option.code)
            } 
        },
        addStateSelected: function(option) {
            let index = this.statesSelected.indexOf(option.provinceCode)

            if (index === -1) {
                this.statesSelected.push(option.provinceCode)
            } 
        },
        addCountrySelected: function(option) {
            let index = this.countriesSelected.indexOf(option.code)

            if (index === -1) {
                this.countriesSelected.push(option.code)
            } 
        },
        addSymptomSelected: function(option) {
            let index = this.symptomsSelected.indexOf(option.question)

            if (index === -1) {
                this.symptomsSelected.push(option.question)
            }    
        }
    },
    mounted() {
        window.scrollTo(0, 0)
        this.$store.dispatch('getStats', [])
    },
    computed: {
        agesOrder() {
            return this.$store.getters.getAgesOrder
        },
        gendersOrder() {
            return this.$store.getters.getGendersOrder
        },
        seeDoctorOrder() {
            return this.$store.getters.getSeeDoctorOrder
        },
        smokerOrder() {
            return this.$store.getters.getSmokerOrder    
        },
        covidTestOrder() {
            return this.$store.getters.getCovidTestOrder
        },
        countries() {
            return this.$store.getters.getCountries
        },
        states() {
            return this.$store.getters.getStates
        },
        symptoms() {
            return this.$store.getters.getSymptomsOrder
        }
    },
    watch: {
        countrySelected: function(country) {
            if (country !== null)
                this.$store.dispatch('getSates', country.code)
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.add-filter, .clear-filter, .search {
    width: 100%;
}

.add-filter i {
    padding-left: 12px;
}

.clear-filter i {
    padding-left: 10px;
}

hr {
    border-top: 1px solid white;
}

.search i {
    margin-left: 14px;
}

.dot-1 {
  height: 6px;
  width: 6px;
  background-color: #50cca8;
  border-radius: 50%;
  display: inline-block;
}

.dot-2 {
    height: 6px;
    width: 6px;
    background-color: #f57a6e;
    border-radius: 50%;
    display: inline-block;  
}

.dot-3 {
    height: 6px;
    width: 6px;
    background-color: #285150;
    border-radius: 50%;
    display: inline-block;  
}

.dot-4 {
    height: 6px;
    width: 6px;
    background-color: #7eadb3;
    border-radius: 50%;
    display: inline-block;  
}

.dot-5 {
    height: 6px;
    width: 6px;
    background-color: #fdcccd;
    border-radius: 50%;
    display: inline-block;  
}

.dot-6 {
    height: 6px;
    width: 6px;
    background-color: #c0d7e0;
    border-radius: 50%;
    display: inline-block;  
}

.dot-7 {
    height: 6px;
    width: 6px;
    background-color: #acdcda;
    border-radius: 50%;
    display: inline-block;  
}

.tag {
    display: inline-block;
    background-color: #285150;
    color: white;
    padding: 5px;
    margin-right: 15px;
    height: 35px;
    border-radius: 4px;
}

.tag span {
    padding-left: 5px;
    font-weight: 600;
    cursor: pointer;
}
</style>