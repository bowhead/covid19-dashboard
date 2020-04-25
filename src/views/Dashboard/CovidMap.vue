<template>
    <card>
        <div id="covid-map" style="width: 100%; height: 500px;"></div>
    </card>
</template>

<script>
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

    export default {
        name: 'CovidMap',
        data() {
            return {
                map: null  
            }
        },
        methods: {
            loadMap: function() {
                let self = this
                
                mapboxgl.accessToken = process.env.VUE_APP_MAP_BOX_TOKEN;

                this.map = new mapboxgl.Map({
                    container: 'covid-map',
                    zoom: 1.2,
                    center: [0, 20],
                    style: 'mapbox://styles/mapbox/light-v10'
                });

                this.map.on('load', function() {
                    
                    self.map.addSource('covid-people', {
                        type: 'geojson',
                        data: self.mapPoints,
                        cluster: true,
                        clusterMaxZoom: 14, // Max zoom to cluster points on
                        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                    });

                    self.map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'covid-people',
                        filter: ['has', 'point_count'],
                        paint: {
                            'circle-color': '#e39f70',
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });

                    self.map.addLayer({
                        id: 'cluster-count',
                        type: 'symbol',
                        source: 'covid-people',
                        filter: ['has', 'point_count'],
                        layout: {
                            'text-field': '{point_count_abbreviated}',
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        }
                    });

                    self.map.addLayer({
                        'id': 'people_circle',
                        'type': 'circle',
                        'source': 'covid-people',
                        'filter': ['!=', 'cluster', true],
                        'paint': {
                            'circle-color': '#e39f70',
                            'circle-opacity': 0.6,
                            'circle-radius': 12
                        }
                    });


                    self.map.addLayer({
                        id: 'people_label',
                        type: 'symbol',
                        source: 'covid-people',
                        filter: ['!=', 'cluster', true],
                        layout: {
                            'text-field': [
                                'number-format',
                                ['get', 'people'],
                                { 'min-fraction-digits': 0, 'max-fraction-digits': 0 }
                            ],
                            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                            'text-size': 12
                        },
                        paint: {
                            'text-color': 'black'
                        }
                    });
                });
            }
        },
        mounted() {
            this.loadMap()
        },
        computed: {
            mapPoints() {
                return this.$store.getters.getMapStats
            }
        },
        watch: {
            mapPoints: function() {
                if (this.map.getSource('covid-people')) {
                    this.map.getSource('covid-people').setData(this.mapPoints)
                }
            }
        }
    }
</script>