import React from 'react';
import App from 'components/App';
import { BrowserRouter as Router} from 'react-router-dom';

function Root(props) {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;