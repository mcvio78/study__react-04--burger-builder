import React, { Component } from 'react';

const asyncComponent = importComponent => {
  return class extends Component { /* eslint-disable-line */

    state = {
      component: null
    };

    componentDidMount() {
      importComponent()              // Importing component
        .then(cmp => {
          this.setState({ component: cmp.default });    // component default
        });
    }

    render() {
      const C = this.state.component;

      return C  ?  <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
