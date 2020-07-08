// import React, { Component } from 'react';
// import React, { useState, useEffect } from 'react';
import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler'

//  ERROR HANDLER CLASS-BASED
// const withErrorHandler = (WrappedComponent, axios) => {
//   return class extends Component {
//
//     state = {
//       error: null
//     };
//
//     // eslint-disable-next-line
//     componentWillMount() {
//       this.reqInterceptor = axios.interceptors.request.use(req => {
//         this.setState({ error: null });
//         return req;
//       });
//
//       this.resInterceptor = axios.interceptors.response.use(
//         res => res,
//         error => {
//           this.setState({ error: error });
//         });
//     }
//
//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.reqInterceptor);
//       axios.interceptors.response.eject(this.resInterceptor);
//     }
//
//     errorConfirmedHandler = () => {
//       this.setState({ error: null });
//     };
//
//     render() {
//       return (
//         <Auxiliary>
//           <Modal
//             show={this.state.error}
//             closeModal={this.errorConfirmedHandler}>
//             {this.state.error ? this.state.error.message : null}
//           </Modal>
//           <WrappedComponent {...this.props}/>
//         </Auxiliary>
//       );
//     }
//   };
// };

// ERROR HANDLER FUNCTIONAL
// const withErrorHandler = (WrappedComponent, axios) => {
//
//   return props => {
//     const [error, setError] = useState(null)
//
//     const reqInterceptor = axios.interceptors.request.use(req => {
//       setError(null);
//       return req;
//     });
//
//     const resInterceptor = axios.interceptors.response.use(
//       res => {
//         return res
//       },
//       err => {
//         setError(err);
//         return Promise.reject(err);
//       }
//     );
//
//     useEffect(() => {
//       return () => {
//         axios.interceptors.request.eject(reqInterceptor);
//         axios.interceptors.response.eject(resInterceptor);
//       }
//     }, [reqInterceptor, resInterceptor])
//
//
//     const errorConfirmedHandler = () => {
//       setError(null);
//     };
//
//     return (
//       <Auxiliary>
//         <Modal show={error} closeModal={errorConfirmedHandler}>
//           {error ? error.message : null}
//         </Modal>
//         <WrappedComponent {...props}/>
//       </Auxiliary>
//     );
//   };
// };

// ERROR HANDLER WITH CUSTOM HOOK
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <Auxiliary>
        <Modal show={error} closeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props}/>
      </Auxiliary>
    );
  };
};

export default withErrorHandler;
