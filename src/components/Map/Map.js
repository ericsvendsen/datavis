import React, { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { StaticMap } from 'react-map-gl';

// TODO use scss
import './Map.css';

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
            // TODO key
            object.points.forEach(point => {
                dataArr.push(
                    <ul>
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
        }
        // TODO set empty div
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
        <DeckGL
            initialViewState={initialViewState}
            controller={true}
            layers={layer}
        >
            {tooltipEl}
            <StaticMap
                attributionControl={false}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                mapStyle="mapbox://styles/mapbox/dark-v8"
            />
        </DeckGL>
    );
};

export default Map;
