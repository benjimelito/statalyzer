import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<AwesomeComponent />
    	</div>
    );
  }
}

render(<App/>, document.getElementById('app'));
