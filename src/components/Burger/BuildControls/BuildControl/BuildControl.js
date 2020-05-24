import React, { Component } from 'react';

import classes from './BuildControl.module.css';

class BuildControl extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.disableButton !== this.props.disableButton;
  }

  render() {
    return (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{this.props.label}</div>
        <button
          onClick={this.props.removed}
          className={classes.Less}
          disabled={this.props.disableButton}>less
        </button>
        <button
          onClick={this.props.added}
          className={classes.More}>more
        </button>
      </div>
    );
  }
}

export default BuildControl;
