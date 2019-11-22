import React, { useState } from 'react';
import 'whatwg-fetch';
import Map from './components/Map/Map';

import './App.css';

function App() {
    const [data, setData] = useState(null);
    const getData = async () => {
        try {
            const response = await fetch('http://localhost:3000/data.json');
            const json = await response.json();
            if (response.status === 200) {
                return json;
            } else {
                console.log(response.statusText);
            }
        } catch (err) {
            console.log(err);
            // return toast(err.message, { type: toast.TYPE.ERROR, autoClose: 3000 });
        }
    };
    getData().then(d => {
        setData(d);
    });
    return (
        <div className="App">
            <Map data={data} />
        </div>
    );
}

export default App;
