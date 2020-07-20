import React, { memo } from 'react';

import classes from './BuildControl.module.scss';

// class BuildControl extends Component {
//   shouldComponentUpdate(nextProps, nextState, nextContext) {
//     return nextProps.disableButton !== this.props.disableButton;
//   }
//
//   render() {
//     return (
//       <div className={classes.BuildControl}>
//         <div className={classes.Label}>{this.props.label}</div>
//         <button
//           onClick={this.props.removed}
//           className={classes.Less}
//           disabled={this.props.disableButton}>less
//         </button>
//         <button
//           onClick={this.props.added}
//           className={classes.More}>more
//         </button>
//       </div>
//     );
//   }
// }
//
// export default BuildControl;

const areEqual = (prevProps, nextProps) => {
  return prevProps.disableButton === nextProps.disableButton;
};

const BuildControl = memo(props => {
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return nextProps.disableButton !== this.props.disableButton;
  // }
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        type="button"
        onClick={props.removed}
        className={classes.Less}
        disabled={props.disableButton}>less
      </button>
      <button
        type="button"
        onClick={props.added}
        className={classes.More}>more
      </button>
    </div>
  );
}, areEqual);

export default BuildControl;
