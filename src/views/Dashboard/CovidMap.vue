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
        mounted() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYmhoZWFsdGgiLCJhIjoiY2s4cTV1bmcxMDBpNDNlbzR1azdmYng0MCJ9.ETqyzaPQqbJFojoG4C1OPQ';

            var map = new mapboxgl.Map({
                container: 'covid-map',
                zoom: 1.2,
                center: [0, 20],
                style: 'mapbox://styles/mapbox/light-v10'
            });

            map.on('load', function() {
                
                map.addSource('earthquakes', {
                    type: 'geojson',
                    // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                    // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                    data:
                    'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                    cluster: true,
                    clusterMaxZoom: 14, // Max zoom to cluster points on
                    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });

                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    paint: {
                        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                        // with three steps to implement three types of circles:
                        //   * Blue, 20px circles when point count is less than 100
                        //   * Yellow, 30px circles when point count is between 100 and 750
                        //   * Pink, 40px circles when point count is greater than or equal to 750
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

                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                    }
                });
            });
        }
    }
</script>