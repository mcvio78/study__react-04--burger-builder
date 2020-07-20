// import React, { Component } from 'react';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// class Layout extends Component {
//   state = {
//     showSideDrawer: false
//   };
//
//   sideDrawerCloseHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };
//
//   sideDrawerToggleHandler = () => {
//     this.setState(prevState => {
//       return { showSideDrawer: !prevState.showSideDrawer };
//     });
//   };
//
//   render() {
//     return (
//       <Auxiliary>
//         <Toolbar
//           drawerToggleClicked={this.sideDrawerToggleHandler}
//           isAuth={this.props.isAuthenticated}/>
//         <SideDrawer
//           closed={this.sideDrawerCloseHandler}
//           open={this.state.showSideDrawer}
//           isAuth={this.props.isAuthenticated}/>
//         <main className={classes.Content}>
//           {this.props.children}
//         </main>
//       </Auxiliary>
//     );
//   }
// }

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Auxiliary>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated} />
      <SideDrawer
        closed={sideDrawerCloseHandler}
        open={showSideDrawer}
        isAuth={props.isAuthenticated} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
