import Vue from 'vue'
import VueI18n from 'vue-i18n'
//import Formatter from './formatter'

Vue.use(VueI18n)

const locale = 'en-US' //default locale
//const formatter = new Formatter({ locale })

export default new VueI18n({
    locale,
    messages: {
        'en-US': {
            filters: {
                dateStart: 'Date (start)',
                dateEnd: 'Date (end)',
                country: 'Country',
                state: 'State',
                gender: 'Gender',
                age: 'Age range',
                symptoms: 'Symptoms',
                medication: 'Medication',
                smoker: 'Smoker',
                covidTest: 'COVID-19 Test',
                seeDoctor: 'See a doctor',
                add: 'Add filter',
                clear: 'Clear filters',
                search: 'Search'
            },
            dashboard: {
                noData: 'No data available',
                peopleTiredExhausted: 'Symptoms of people who feel tired or exhausted',
                peopleFeelUnwell: 'People who feel unwell',
                generalSymptoms: 'General Symptoms',
                peopleHaveFever: 'People who have a self-reported fever',
                peopleFeelingUnwell: 'Number of people reporting feeling unwell',
                peopleCoMorbitidites: 'People who feel unwell & co-morbitidites',
                cough: 'Cough',
                headaches: 'Headaches',
                bodyAches: 'Body aches',
                peopleFeelIll: 'Symptoms of people who feel ill',
                peopleReported: 'People reported',
                recovered: 'Recovered',
                deaths: 'Deaths',
                confirmed: 'Confirmed',
                suspected: 'Suspected',
                fellIll: 'Feel ill',
                fellTired: 'Feel tired or exhausted',
                aches: 'Aches',
                shortness: 'Shortness of breath',
                asthma: 'Asthma',
                diabetes: 'Diabetes',
                obesity: 'Obesity',
                copd: 'COPD',
                hypertension: 'Hypertension',
                others: 'Others',
                severe: 'Severe',
                mild: 'Mild',
                moderate: 'Moderate',
                headachesMild: 'Headaches Mild',
                severeCough: 'Severe Cough',
                severeBodyAches: 'Severe body aches',
                mildCough: 'Mild cough',
                severeHeadaches: 'Severe headaches',
                moderateBodyAches: 'Moderate body aches',
                feelWell: 'Feel Well',
                feelUnwell: 'Feel Unwell'
            }
        }  
    }
})