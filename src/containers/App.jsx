import React, { Component } from 'react';
import Aside from '../components/Aside';
import Main from '../components/Main';

import './App.scss';

class App extends Component {
    render() {
        return (
            <div className="react-app container-fluid">
                <div className="row">
                    <div className="col-xs-4 col-sm-2">
                        <Aside />
                    </div>
                    <div className="col-xs-8 col-sm-10">
                        <Main />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
