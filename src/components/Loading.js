import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <FontAwesomeIcon icon="spinner" size="4x" pulse />
      </div>
    );
  }
}

export default Loading;
