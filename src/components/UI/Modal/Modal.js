// import React, { Component } from 'react';
import React, { memo } from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

// class modal extends Component {
//   shouldComponentUpdate(nextProps, nextState, nextContext) {
//     return nextProps.show !== this.props.show ||
//       nextProps.children !== this.props.children;
//   }
//
//   // componentDidUpdate() {
//   //   console.log('[Modal.js] componentDidUpdate CHILDREN: '
//   //     + this.props.children);
//   // }
//
//   render() {
//     return (
//       <Auxiliary>
//         <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
//         <div
//           className={classes.Modal}
//           style={{
//             transform: this.props.show
//               ? 'translateY(0)' : 'translateY(-100vh)',
//             opacity: this.props.show ? '1' /* eslint-disable-line */
//               : '0'
//           }}>
//           {this.props.children}
//         </div>
//       </Auxiliary>
//     );
//   }
// }

const modal = props => {
  // componentDidUpdate() {
  //   console.log('[Modal.js] componentDidUpdate CHILDREN: '
  //     + this.props.children);
  // }

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.closeModal}/>
      <div
        className={classes.Modal}
        style={{
          transform: props.show
            ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1'
            : '0'
        }}>
        {props.children}
      </div>
    </Auxiliary>
  );
}

modal.propTypes = {
  show: PropTypes.bool
};

export default memo(modal, (prevProps, nextProps) => {
  return nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children;
});
