<template>
    <div>
        <base-header
        type="secondary"
        class="pb-6 pb-8 pt-md-1">
            <div class="row">
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Date (start)" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Date (end)" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Country" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="State" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Gender" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                 <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Age range" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-3 pt-3">
                    <base-button type="primary" class="add-filter">
                        Add filters
                        <i class="fas fa-plus"></i>
                    </base-button>
                </div>
            </div>
            <div class="row">
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Symptoms" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Medication" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="Smoker" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="COVID-19 Test" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="col-15 col-md-2 pt-3">
                    <multiselect label="label" placeholder="See a doctor" :options="[]"
                        track-by="code" open-direction="bottom">
                    </multiselect>
                </div>
                <div class="offset-0 col-15 offset-md-2 col-md-3 pt-3">
                    <base-button type="primary" class="clear-filter">
                        Clear filters
                        <i class="fas fa-trash"></i>
                    </base-button>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-15 col-md-12">
                    <label class="tag" v-for="(tag, index) in tags" :key="index">{{ tag }} <span>x</span> </label>
                    
                            <!-- <button type="button" class="btn btn-primary tag" v-for="(tag, index) in tags" :key="index">
                                {{ tag }} <span class="badge badge-light">X</span>
                            </button> -->
                </div>
                <div class="col-15 col-md-3">
                    <base-button type="default" class="search">
                        Search
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
                <div class="col-15 col-md-5">
                    <people-have-fever></people-have-fever>
                </div>
                <div class="col-15 col-md-5">
                    <people-feeling-unwell></people-feeling-unwell>
                </div>
                <div class="col-15 col-md-5">
                    <people-co-morbitidites></people-co-morbitidites>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-15 col-md-5">
                    <cough></cough>
                </div>
                <div class="col-15 col-md-5">
                    <headaches></headaches>
                </div>
                <div class="col-15 col-md-5">
                    <body-aches></body-aches>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-15 col-md-5">
                    <symptom-people></symptom-people>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

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
            tags: [
               '12 mar - 12 apr',
               'Italy',
               'Us',
               'Male',
               '21-24',
               'Cough',
               'Smoker (yes)',
               'COVID-19 Test (no)'
            ]
        }
    },
    mounted() {
        window.scrollTo(0, 0)
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