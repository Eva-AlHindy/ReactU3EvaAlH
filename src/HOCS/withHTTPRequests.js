/* withHTTPRequests ia a Higher-order component:
which is a function that takes a component and returns a new component.
This has a state : userList which is an array, and
fetchUsers which is a method used to fetch the users data from API.
*/

import React, { Component } from 'react';
export default function withHTTPRequests(WrappedComponent, selectData) {

    return class extends Component {
      constructor(props){
        super(props);

        this.state = {
            userList:[],
        }
      }

      fetchUsers = () => {
        fetch('http://api.softhouse.rocks/users')
        .then((response)=> response.json().then((response)=>{
          this.setState({userList:response});
        }));
      }

      render() {
        /*we pass through WrappedComponent a method fetchUsers and userList as props*/
        return (
          <WrappedComponent
            fetchUsers={this.fetchUsers}
            userList={this.state.userList}
            {...this.props}
          />
        )
      }
    };
  }
