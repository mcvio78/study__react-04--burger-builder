// import React, { Component } from 'react';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

// class Orders extends Component {
//
//   componentDidMount() {
//     this.props.onFetchOrders(this.props.tkn, this.props.uId);
//   }
//
//   render() {
//     let orders = (<Spinner/>);
//     if (!this.props.load) {
//       orders = this.props.ords.map(order => (
//         <Order
//           key={new Date().getTime()}
//           ingredients={order.ingredients}
//           price={+order.price}/>
//       ));
//     }
//
//     return (
//       <div>
//         {orders}
//       </div>
//     );
//   }
// }

const Orders = props => {
  const { onFetchOrders, tkn, uId } = props;

  useEffect(() => {
    onFetchOrders(tkn, uId);
  }, [onFetchOrders, tkn, uId ])

  let orders = (<Spinner/>);
  if (!props.load) {
    orders = props.ords.map(order => (
      <Order
        key={new Date().getTime()}
        ingredients={order.ingredients}
        price={+order.price}/>
    ));
  }

  return (
    <div>
      {orders}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ords: state.ord.orders,
    load: state.ord.loading,
    tkn: state.auth.token,
    uId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

