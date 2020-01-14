import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';

import '../../assets/mapbox-gl.css';
import './Map.scss';

const Map = ({ data }) => {
    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXN2ZW5kc2VuIiwiYSI6ImNrMzlyNnpoNzA2ZnQzY213dDBkdmdudGYifQ.PufBhISmr7at_MBeUe_kNg';

    const [tooltipEl, setTooltipEl] = useState(<div />);

    const initialViewState = {
        longitude: -122.41669,
        latitude: 37.7853,
        zoom: 11,
        pitch: 60,
        bearing: 0
    };

    const handleOnHover = ({ object, x, y }) => {
        if (object) {
            const dataArr = [];
            object.points.forEach((point, idx) => {
                dataArr.push(
                    <ul key={idx}>
                        <li>{point.ADDRESS}</li>
                        <li>Racks: {point.RACKS}</li>
                        <li>Spaces: {point.SPACES}</li>
                    </ul>
                );
            });
            setTooltipEl(
                <div className="tooltip" style={{ left: x, top: y }}>
                    {dataArr}
                </div>
            );
        } else {
            setTooltipEl(<div />);
        }
    };

    const layer = new HexagonLayer({
        id: 'hexagon-layer',
        data,
        pickable: true,
        extruded: true,
        radius: 200,
        elevationScale: 4,
        getPosition: d => d.COORDINATES,
        onHover: handleOnHover
    });

    return (
        <>
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
            {tooltipEl}
        </>
    );
};

export default Map;
