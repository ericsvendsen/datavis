import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';

import './Map.css';

const Map = ({ data }) => {
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXN2ZW5kc2VuIiwiYSI6ImNrMzlyNnpoNzA2ZnQzY213dDBkdmdudGYifQ.PufBhISmr7at_MBeUe_kNg';

    const initialViewState = {
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 11,
        pitch: 60,
        bearing: 0
    };

    const layer = new HexagonLayer({
        id: 'hexagon-layer',
        data,
        pickable: true,
        extruded: true,
        radius: 200,
        elevationScale: 4,
        getPosition: d => d.COORDINATES
    });

    return (
        <DeckGL
            initialViewState={initialViewState}
            controller={true}
            layers={layer}
        >
            <StaticMap
                attributionControl={false}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v8"
            />
        </DeckGL>
    );
};

export default Map;
