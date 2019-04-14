/* UserScreen is a function component which renders a CardComponent.
CardComponent receives match object from router as props (this.props.match.params.id)
and this represents a user.
if there is a user (props) so the CardComponent shows UserInformationComponent.
And if there isn't user so the CardComponent (shows <div>No user selected</div>)
or redirect to LoginScreen.
*/
import React, { Component,Fragment,useState, useEffect } from 'react';
//import { Redirect } from "react-router-dom";
import CardComponent from '../components/CardComponent';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';


  function UserScreen(props){
    /* Declare a new state variable, which we'll call "user"
       setUser is the function to update the state.
       [](an empty array) is the initial value*/
    const [user, setUser] = useState([]);

  /*useEffect is similar to componentDidMount.
  and this place is the best for fetch data.*/
    useEffect(() => {
      const {
        match: {
          params
        }
      } = props;
      let userId = params.id;

      let url='http://api.softhouse.rocks/users/'+userId;

      if(userId == undefined)
        url='http://api.softhouse.rocks/users/';

      fetch(url)
        .then((response)=> response.json().then((response)=>
            setUser(response))
          )}, []);

          const {
            match: {
              params
            }
          } = props;
          const userId = params.id;

      return (
        <CardComponent>
        {userId ? <UserInformation user={user}/> : <div>No user selected</div> }
        {/*user ? <div>{"Selected user:  " + user}</div> : <Redirect from="/user" to="/"/>*/}
      </CardComponent>
      );

}
export default UserScreen;

UserScreen.propTypes = {
                history: PropTypes.object,
                location: PropTypes.object,
                match: PropTypes.object
}

/*UserInformation is a class component is used to show the
information of user(username,name,email and toggle adress.)*/
class UserInformation extends Component {
  constructor(props) {
    super(props);
      this.state = {
        showAddress:false
          };
    }
/*toggleAddress is a method to change the state (showAddress) from false till true or vice versa
  by using setState.*/
    toggleAddress = (e) => {
        this.setState({
          showAddress: !this.state.showAddress
        });
      }

render(){

  const {
    username,
    name,
    email
  } = this.props.user;

  return(
    <Fragment>
     <img src="http://placekitten.com/350/200" alt="kitten"/>
     <div>{username}</div>
     <div>{name}</div>
     <div>{email}</div>
     <hr/>
     {this.props.user.address &&
       <Fragment >
       {this.state.showAddress?
         <div >
         <div>{this.props.user.address.city}</div>
         <div>{this.props.user.address.street}</div>
         <div>{this.props.user.address.suite}</div>
         <br/>
         </div>
         :null}
       <Button className="cardBtn" variant="primary" onClick={this.toggleAddress}>Show info</Button>
       </Fragment>
     }
  </Fragment>
  )
  }
}
