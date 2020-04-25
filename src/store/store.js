import Vue from 'vue'
import Vuex from 'vuex'
import LoginService from '@/services/LoginService.js'
//import axios from 'axios'
//import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        points: '',
        headaches: [],
        bodyAches: [],
        cough: [],
        peopleFeelUnwell: [],
        generalSymptoms: [],
        peopleCoMorbitidites: [],
        peopleFeelingUnwell: [],
        peopleHaveFever: [],
        peopleFeelIll: [],
        mapPoints: [],
        howPeopleFeel: [],
        agesOrder: [
            '18-24',
            '25-34',
            '35-44',
            '45-54',
            '55-64',
            '65+',
        ],
        gendersOrder: [
            'Female',
            'Male',
        ],
        seeDoctorOrder: [
            {'label': 'Yes', 'value': 'See a doctor (yes)', 'code': 'yes',},
            {'label': 'No', 'value': 'See a doctor (no)', 'code': 'no',},
        ],
        smokerOrder: [
            {'label': 'Yes', 'value': 'Smoker (yes)', 'code': 'yes'},
            {'label': 'No', 'value': 'Smoker (no)', 'code': 'no'},  
        ],
        covidTestOrder: [
            {'label': 'Positive', 'value': 'COVID-19 Test (positive)', 'code': 'positive'},
            {'label': 'Negative', 'value': 'COVID-19 Test (negative)', 'code': 'negative'},
            {'label': 'Waiting For Result', 'value': 'COVID-19 Test (waiting)', 'code': 'waiting for the result'},
        ],
        countries: [
            {"code":"AF", "label":"Afghanistan", },
            {"code":"AX", "label":"Åland Islands", },
            {"code":"AL", "label":"Albania", },
            {"code":"DZ", "label":"Algeria", },
            {"code":"AS", "label":"American Samoa", },
            {"code":"AD", "label":"Andorra", },
            {"code":"AO", "label":"Angola", },
            {"code":"AI", "label":"Anguilla", },
            {"code":"AQ", "label":"Antarctica", },
            {"code":"AG", "label":"Antigua and Barbuda", },
            {"code":"AR", "label":"Argentina", },
            {"code":"AM", "label":"Armenia", },
            {"code":"AW", "label":"Aruba", },
            {"code":"AU", "label":"Australia", },
            {"code":"AT", "label":"Austria"},
            {"code":"AZ", "label":"Azerbaijan", },
            {"code":"BS", "label":"Bahamas", },
            {"code":"BH", "label":"Bahrain", },
            {"code":"BD", "label":"Bangladesh", },
            {"code":"BB", "label":"Barbados", },
            {"code":"BY", "label":"Belarus", },
            {"code":"BE", "label":"Belgium", },
            {"code":"BZ", "label":"Belize", },
            {"code":"BJ", "label":"Benin", },
            {"code":"BM", "label":"Bermuda", },
            {"code":"BT", "label":"Bhutan", },
            {"code":"BO", "label":"Bolivia", },
            {"code":"BA", "label":"Bosnia and Herzegovina", },
            {"code":"BW", "label":"Botswana", },
            {"code":"BV", "label":"Bouvet Island", },
            {"code":"BR", "label":"Brazil", },
            {"code":"IO", "label":"British Indian Ocean Territory", },
            {"code":"BN", "label":"Brunei Darussalam", },
            {"code":"BG", "label":"Bulgaria", },
            {"code":"BF", "label":"Burkina Faso", },
            {"code":"BI", "label":"Burundi", },
            {"code":"KH", "label":"Cambodia", },
            {"code":"CM", "label":"Cameroon", },
            {"code":"CA", "label":"Canada", },
            {"code":"CV", "label":"Cape Verde", },
            {"code":"KY", "label":"Cayman Islands", },
            {"code":"CF", "label":"Central African Republic", },
            {"code":"TD", "label":"Chad", },
            {"code":"CL", "label":"Chile", },
            {"code":"CN", "label":"China", },
            {"code":"CX", "label":"Christmas Island", },
            {"code":"CC", "label":"Cocos (Keeling) Islands", },
            {"code":"CO", "label":"Colombia", },
            {"code":"KM", "label":"Comoros", },
            {"code":"CG", "label":"Congo", },
            {"code":"CD", "label":"Zaire", },
            {"code":"CK", "label":"Cook Islands", },
            {"code":"CR", "label":"Costa Rica", },
            {"code":"CI", "label":"Cote D'Ivoire", },
            {"code":"HR", "label":"Croatia", },
            {"code":"CU", "label":"Cuba", },
            {"code":"CY", "label":"Cyprus", },
            {"code":"CZ", "label":"Czech Republic", },
            {"code":"DK", "label":"Denmark", },
            {"code":"DJ", "label":"Djibouti", },
            {"code":"DM", "label":"Dominica", },
            {"code":"DO", "label":"Dominican Republic", },
            {"code":"EC", "label":"Ecuador", },
            {"code":"EG", "label":"Egypt", },
            {"code":"SV", "label":"El Salvador", },
            {"code":"GQ", "label":"Equatorial Guinea", },
            {"code":"ER", "label":"Eritrea", },
            {"code":"EE", "label":"Estonia", },
            {"code":"ET", "label":"Ethiopia", },
            {"code":"FK", "label":"Falkland Islands (Malvinas)", },
            {"code":"FO", "label":"Faroe Islands", },
            {"code":"FJ", "label":"Fiji", },
            {"code":"FI", "label":"Finland", },
            {"code":"FR", "label":"France", },
            {"code":"GF", "label":"French Guiana", },
            {"code":"PF", "label":"French Polynesia", },
            {"code":"TF", "label":"French Southern Territories", },
            {"code":"GA", "label":"Gabon", },
            {"code":"GM", "label":"Gambia", },
            {"code":"GE", "label":"Georgia", },
            {"code":"DE", "label":"Germany"},
            {"code":"GH", "label":"Ghana", },
            {"code":"GI", "label":"Gibraltar", },
            {"code":"GR", "label":"Greece", },
            {"code":"GL", "label":"Greenland", },
            {"code":"GD", "label":"Grenada", },
            {"code":"GP", "label":"Guadeloupe", },
            {"code":"GU", "label":"Guam", },
            {"code":"GT", "label":"Guatemala", },
            {"code":"GG", "label":"Guernsey", },
            {"code":"GN", "label":"Guinea", },
            {"code":"GW", "label":"Guinea-Bissau", },
            {"code":"GY", "label":"Guyana", },
            {"code":"HT", "label":"Haiti", },
            {"code":"HM", "label":"Heard and Mcdonald Islands", },
            {"code":"VA", "label":"Holy See (Vatican City State)", },
            {"code":"HN", "label":"Honduras", },
            {"code":"HK", "label":"Hong Kong", },
            {"code":"HU", "label":"Hungary", },
            {"code":"IS", "label":"Iceland", },
            {"code":"IN", "label":"India", },
            {"code":"ID", "label":"Indonesia", },
            {"code":"IR", "label":"Iran", },
            {"code":"IQ", "label":"Iraq", },
            {"code":"IE", "label":"Ireland", },
            {"code":"IM", "label":"Isle of Man", },
            {"code":"IL", "label":"Israel", },
            {"code":"IT", "label":"Italy", },
            {"code":"JM", "label":"Jamaica", },
            {"code":"JP", "label":"Japan", },
            {"code":"JE", "label":"Jersey", },
            {"code":"JO", "label":"Jordan", },
            {"code":"KZ", "label":"Kazakhstan", },
            {"code":"KE", "label":"Kenya", },
            {"code":"KI", "label":"Kiribati", },
            {"code":"KP", "label":"North Korea", },
            {"code":"KR", "label":"South Korea", },
            {"code":"KW", "label":"Kuwait", },
            {"code":"KG", "label":"Kyrgyzstan", },
            {"code":"LA", "label":"Lao", },
            {"code":"LV", "label":"Latvia", },
            {"code":"LB", "label":"Lebanon", },
            {"code":"LS", "label":"Lesotho", },
            {"code":"LR", "label":"Liberia", },
            {"code":"LY", "label":"Libyan Arab Jamahiriya", },
            {"code":"LI", "label":"Liechtenstein", },
            {"code":"LT", "label":"Lithuania", },
            {"code":"LU", "label":"Luxembourg", },
            {"code":"MO", "label":"Macao", },
            {"code":"MK", "label":"Macedonia", },
            {"code":"MG", "label":"Madagascar", },
            {"code":"MW", "label":"Malawi", },
            {"code":"MY", "label":"Malaysia", },
            {"code":"MV", "label":"Maldives", },
            {"code":"ML", "label":"Mali", },
            {"code":"MT", "label":"Malta", },
            {"code":"MH", "label":"Marshall Islands", },
            {"code":"MQ", "label":"Martinique", },
            {"code":"MR", "label":"Mauritania", },
            {"code":"MU", "label":"Mauritius", },
            {"code":"YT", "label":"Mayotte", },
            {"code":"MX", "label":"Mexico", },
            {"code":"FM", "label":"Micronesiaf", },
            {"code":"MD", "label":"Moldova", },
            {"code":"MC", "label":"Monaco", },
            {"code":"MN", "label":"Mongolia", },
            {"code":"MS", "label":"Montserrat", },
            {"code":"MA", "label":"Morocco", },
            {"code":"MZ", "label":"Mozambique", },
            {"code":"MM", "label":"Myanmar", },
            {"code":"NA", "label":"Namibia", },
            {"code":"NR", "label":"Nauru", },
            {"code":"NP", "label":"Nepal", },
            {"code":"NL", "label":"Netherlands", },
            {"code":"AN", "label":"Netherlands Antilles", },
            {"code":"NC", "label":"New Caledonia", },
            {"code":"NZ", "label":"New Zealand", },
            {"code":"NI", "label":"Nicaragua", },
            {"code":"NE", "label":"Niger", },
            {"code":"NG", "label":"Nigeria", },
            {"code":"NU", "label":"Niue", },
            {"code":"NF", "label":"Norfolk Island", },
            {"code":"MP", "label":"Northern Mariana Islands", },
            {"code":"NO", "label":"Norway", },
            {"code":"OM", "label":"Oman", },
            {"code":"PK", "label":"Pakistan", },
            {"code":"PW", "label":"Palau", },
            {"code":"PS", "label":"Palestinian Territory", },
            {"code":"PA", "label":"Panama", },
            {"code":"PG", "label":"Papua New Guinea", },
            {"code":"PY", "label":"Paraguay", },
            {"code":"PE", "label":"Peru", },
            {"code":"PH", "label":"Philippines", },
            {"code":"PN", "label":"Pitcairn", },
            {"code":"PL", "label":"Poland", },
            {"code":"PT", "label":"Portugal", },
            {"code":"PR", "label":"Puerto Rico", },
            {"code":"QA", "label":"Qatar", },
            {"code":"RE", "label":"Reunion", },
            {"code":"RO", "label":"Romania", },
            {"code":"RU", "label":"Russian Federation", },
            {"code":"RW", "label":"Rwanda", },
            {"code":"SH", "label":"Saint Helena", },
            {"code":"KN", "label":"Saint Kitts and Nevis", },
            {"code":"LC", "label":"Saint Lucia", },
            {"code":"PM", "label":"Saint Pierre and Miquelon", },
            {"code":"VC", "label":"Saint Vincent", },
            {"code":"WS", "label":"Samoa", },
            {"code":"SM", "label":"San Marino", },
            {"code":"ST", "label":"Sao Tome and Principe", },
            {"code":"SA", "label":"Saudi Arabia", },
            {"code":"SN", "label":"Senegal", },
            {"code":"CS", "label":"Serbia and Montenegro", },
            {"code":"SC", "label":"Seychelles", },
            {"code":"SL", "label":"Sierra Leone", },
            {"code":"SG", "label":"Singapore", },
            {"code":"SK", "label":"Slovakia", },
            {"code":"SI", "label":"Slovenia", },
            {"code":"SB", "label":"Solomon Islands", },
            {"code":"SO", "label":"Somalia", },
            {"code":"ZA", "label":"South Africa", },
            {"code":"GS", "label":"South Georgia", },
            {"code":"ES", "label":"Spain", },
            {"code":"LK", "label":"Sri Lanka", },
            {"code":"SD", "label":"Sudan", },
            {"code":"SR", "label":"Surilabel", },
            {"code":"SJ", "label":"Svalbard and Jan Mayen", },
            {"code":"SZ", "label":"Swaziland", },
            {"code":"SE", "label":"Sweden", },
            {"code":"CH", "label":"Switzerland"},
            {"code":"SY", "label":"Syrian Arab Republic", },
            {"code":"TW", "label":"Taiwan", },
            {"code":"TJ", "label":"Tajikistan", },
            {"code":"TZ", "label":"Tanzania", },
            {"code":"TH", "label":"Thailand", },
            {"code":"TL", "label":"Timor-Leste", },
            {"code":"TG", "label":"Togo", },
            {"code":"TK", "label":"Tokelau", },
            {"code":"TO", "label":"Tonga", },
            {"code":"TT", "label":"Trinidad and Tobago", },
            {"code":"TN", "label":"Tunisia", },
            {"code":"TR", "label":"Turkey", },
            {"code":"TM", "label":"Turkmenistan", },
            {"code":"TC", "label":"Turks and Caicos Islands", },
            {"code":"TV", "label":"Tuvalu", },
            {"code":"UG", "label":"Uganda", },
            {"code":"UA", "label":"Ukraine", },
            {"code":"AE", "label":"United Arab Emirates", },
            {"code":"GB", "label":"United Kingdom", },
            {"code":"US", "label":"United States", },
            {"code":"UM", "label":"U.S. Minor Outlying Islands", },
            {"code":"UY", "label":"Uruguay", },
            {"code":"UZ", "label":"Uzbekistan", },
            {"code":"VU", "label":"Vanuatu", },
            {"code":"VE", "label":"Venezuela", },
            {"code":"VN", "label":"Vietnam", },
            {"code":"VG", "label":"Virgin Islands, British", },
            {"code":"VI", "label":"Virgin Islands, U.S.", },
            {"code":"WF", "label":"Wallis and Futuna", },
            {"code":"EH", "label":"Western Sahara", },
            {"code":"YE", "label":"Yemen", },
            {"code":"ZM", "label":"Zambia", },
            {"code":"ZW", "label":"Zimbabwe", }
        ],
        states: [],
        symptomsOrder: [
            {'symptom': 'Sore Throat', 'question': 'have_a_sore_throat'},
            {'symptom': 'Headache', 'question': 'have_a_headache'},
            {'symptom': 'Fever', 'question': 'have_a_fever'},
            {'symptom': 'Muscle Aches', 'question': 'have_muscle_aches'},
            {'symptom': 'Cough', 'question': 'have_cough'},
            {'symptom': 'Difficulty Breathing', 'question': 'have_difficulty_breathing'},
        ]
    },
    actions: {
        async getStats ({commit}, filters) {
            let filter = filters

            let data = await LoginService.getCOVIDStats(filter)

            commit('ADD_DATA', data)
        },
        async getSates({commit}, country) {

            let states = await LoginService.getStates(country)

            commit('ADD_STATES', states)
        }
    },
    mutations: {
        ADD_DATA(state, data) {
            state.headaches = getData(data[0])
            state.bodyAches = getData(data[1])
            state.cough = getData(data[2])
            state.peopleFeelUnwell = getData(data[3])
            state.generalSymptoms = getData(data[4])
            state.peopleCoMorbitidites = getData(data[5])
            state.peopleFeelingUnwell = getData(data[6])
            state.peopleHaveFever = getData(data[7])
            state.peopleFeelIll = getData(data[8])
            state.mapPoints = getData(data[9])
            state.howPeopleFeel = getData(data[10])
        },
        ADD_STATES(state, states) {
            if (states === null)
                state.states = []
            else
                state.states = states.data
        }
    },
    getters: {
        getHeadachesStats: state => {
            return state.headaches;
        },
        getBodyAchesStats: state => {
            return state.bodyAches;
        },
        getCoughStats: state => {
            return state.cough
        },
        getPeopleFeelUnwell: state => {
            return state.peopleFeelUnwell
        },
        getGeneralSymptomsStats: state => {
            return state.generalSymptoms
        },
        getPeopleCoMorbitiditesStats: state => {
            return state.peopleCoMorbitidites
        },
        getPeopleFeelingUnwell: state => {
            return state.peopleFeelingUnwell
        },
        getPeopleHaveFeverStats: state => {
            return state.peopleHaveFever
        },
        getPeopleFeelIllStats: state => {
            return state.peopleFeelIll
        },
        getAgesOrder: state => {
            return state.agesOrder
        },
        getGendersOrder: state => {
            return state.gendersOrder
        },
        getSeeDoctorOrder : state => {
            return state.seeDoctorOrder
        },
        getSmokerOrder: state => {
            return state.smokerOrder
        },
        getCovidTestOrder: state => {
            return state.covidTestOrder
        },
        getCountries: state => {
            return state.countries
        },
        getStates: state => {
            return state.states
        },
        getSymptomsOrder: state => {
            return state.symptomsOrder
        },
        getMapStats: state => {
            return state.mapPoints
        },
        getHowPeopleFeelStats: state => {
            return state.howPeopleFeel
        }
    }
})

function getData(data) {
    /* eslint-disable no-console */
    if (data.status === 200) {
        return data.data
    }
}