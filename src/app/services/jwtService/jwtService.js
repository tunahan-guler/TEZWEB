import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from '@history';

import client from './../../../apolloClient';
import { gql } from '@apollo/client';
import jwt from 'jwt-decode'
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit('onNoAccessToken');
      //BURASI 
      history.push({
        pathname: '/login',
      });

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password, loginMutation) => {

    return new Promise((resolve, reject) => {
      console.log(loginMutation,"loginMutation")
      loginMutation({ 
        variables: {
          prmLoginInput: {
            email: email,
            passowrd: password
          }
        },
      })  .then((res) => {
            console.log(loginMutation,"yes");
            if (res.data.login.resultType == "SUC") {
              const user = res.data.login.data;
              console.log('USER', user)
              let NewUser = {
                // role: user.userroles.map(roleCode => roleCode),
                role: user.userroles[0].roleCode,
                data: {
                  // displayName: user.name + " " + user.surname,
                  displayName: user.userDesc,
                  photoURL: 'assets/images/avatars/profile.jpg',
                  email: user.email,
                  subscriptionId:user.subscriptionId,
                  shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
                },
              };
              if (user) {
                const token = res.data.login.messageText;
                const userToken = jwt(token);
                console.log(userToken, "USER TOKEN");
                this.setSession(token);
                resolve(NewUser);
              } else {
                reject(response.data.error);
              }
            }
            else{
              reject({message: res.data.login.messageText});
            }
  
          });
//       const LoginMutation = gql`
//       mutation Login ($loginInput:LoginInputTypeInput!){
//   login (loginInput:$loginInput ) {
//     resultType
//     messageText
//     data {
//       subscriptionId
//       email
//       perNo
//       langType
//       userDesc 
//       userroles{
//         roleCode 
//       }
//     }
//   }
// }`
      // client.mutate({
      //   mutation: LoginMutation, variables: {
      //     "loginInput": {
      //       // "email": "mebamotor@outlook.com",
      //       "email": email,
      //       "passowrd": password
      //       // "passowrd": "123456"
      //     }
      //   },
      // })
      //   .then((res) => {
      //     console.log(loginMutation,"yes");
      //     if (res.data.login.resultType == "SUC") {
      //       const user = res.data.login.data;
      //       console.log('USER', user)
      //       let NewUser = {
      //         // role: user.userroles.map(roleCode => roleCode),
      //         role: user.userroles[0].roleCode,
      //         data: {
      //           // displayName: user.name + " " + user.surname,
      //           displayName: user.userDesc,
      //           photoURL: 'assets/images/avatars/profile.jpg',
      //           email: user.email,
      //           subscriptionId:user.subscriptionId,
      //           shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
      //         },
      //       };
      //       if (user) {
      //         const token = res.data.login.messageText;
      //         const userToken = jwt(token);
      //         console.log(userToken, "USER TOKEN");
      //         this.setSession(token);
      //         resolve(NewUser);
      //       } else {
      //         reject(response.data.error);
      //       }
      //     }
      //     else{
      //       reject({message: res.data.login.messageText});
      //     }

      //   });
    });
  };

  signInWithToken = () => {
    var x = localStorage.getItem("jwt_access_token");
    const access_token = this.getAccessToken();
    const decoded = jwtDecode(access_token);
    console.log('jwt_access_token', decoded)



    return new Promise((resolve, reject) => {
      const LoginControlMutation = gql`
     mutation LoginControl ($loginInput:LoginInputTypeInput!){
  loginControl (loginInput:$loginInput ) {
    resultType
    messageText
    data {
      subscriptionId
      email
      perNo
      langType
      userDesc 
      userroles{
        roleCode 
      }
    }
  }
}`
      client.mutate({
        mutation: LoginControlMutation, variables: {
          "loginInput": {
            // "email": "mebamotor@outlook.com",
            "email": decoded.Email,
            "passowrd": decoded.Upass
          }
        }
      })
        .then((res) => {

          const user = res.data.loginControl.data;
          console.log('USER', user)
          let NewUser = {
            role: user?.userroles?.map(roleCode => roleCode),
            data: {
              // displayName: user.name + " " + user.surname,
              displayName: user?.userDesc,
              photoURL: 'assets/images/avatars/profile.jpg',
              subscriptionId:user?.subscriptionId,
              email: user?.email,
              shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
            },
          };
          if (user) {
            const token = res.data.loginControl.messageText;
            const userToken = jwt(token);
            console.log(userToken, "USER TOKEN");
            this.setSession(token);
            resolve(NewUser);
          } else {
            reject(response?.data?.error);
          }
        });
      // axios
      //   .get('/api/auth/access-token', {
      //     data: {
      //       access_token: this.getAccessToken(),
      //     },
      //   })
      //   .then((response) => {
      //     if (response.data.user) {
      //       this.setSession(response.data.access_token);
      //       resolve(response.data.user);
      //     } else {
      //       this.logout();
      //       reject(new Error('Failed to login with token.'));
      //     }
      //   })
      //   .catch((error) => {
      //     this.logout();
      //     reject(new Error('Failed to login with token.'));
      //   });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  };
}

const instance = new JwtService();

export default instance;
