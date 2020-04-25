import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URI,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 50000
})

apiClient.interceptors.request.use(config => {
    NProgress.start()
    return config
})

apiClient.interceptors.response.use(response => {
    NProgress.done()
    return response
})

export default {
    getCOVIDStats(filters) {
        let qs = '';

        if (filters && filters.length) {
            qs = '?' + filters.join('&');
        }
        let stats = []

        stats.push(apiClient.get('/getHeadacheStats' + qs))
        stats.push(apiClient.get('/getBodyAchesStats' + qs))
        stats.push(apiClient.get('/getCoughStats' + qs))
        stats.push(apiClient.get('/getPeopleFeelUnwellStats' + qs))
        stats.push(apiClient.get('/getGeneralSymptomsStats' + qs))
        stats.push(apiClient.get('/getPeopleCoMorbitiditesStats' + qs))
        stats.push(apiClient.get('/getPeopleFeelingUnwellStats' + qs))
        stats.push(apiClient.get('/getFeverStats' + qs))
        stats.push(apiClient.get('/getSymptomsPeopleFeelIllStats' + qs))
        stats.push(apiClient.get('/getMapStats' + qs))
        stats.push(apiClient.get('/getHowPeopleFeel' + qs))
        
        return axios.all(stats)
    },
    getStates(country) {
        return apiClient.get('/getStates/' + country)
    }
}