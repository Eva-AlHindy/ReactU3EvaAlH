/* DashBoardComponent is a class component which has  two states in the constructor:
1- a value that respects the value of the input field in the form.
2-color which we use to change the colour of the text in the user list.
the component has also five methods:
1-componentDidMount:is a lifecycle method which called after
all the elements of the page is rendered correctly.
2-handleChange: To control and change the value of the input field in the form by using setState.
3-addUserName: To add the value of the input field as an item into the userList array.
4-removUserName: To remove an item from the userList array.
5-toggleColor: To change the colour of the text of the user by changing the state of the colour
from true to false or vice versa by using setState.
*/
import React, { Component , Fragment} from 'react';
import UserListComponent from '../components/UserListComponent';
import CardComponent from '../components/CardComponent';
import {Container,Row,Col,Button,Form,ListGroup} from 'react-bootstrap';
/* withHTTPRequests is a Higher-order component which takes DashBoardComponent and returns a
new component*/
import withHTTPRequests from './../HOCS/withHTTPRequests';
import PropTypes from 'prop-types';


class DashBoardComponent extends Component {

  static propTypes = {
      userList: PropTypes.array,// throws a warning if userList is not array.
      fetchUsers: PropTypes.func.isRequired// The function fetchUsers is required .
    }

  constructor(props) {
    super(props);
        this.state ={
             name: '',
             username: '',
             email: '',
             color:true,
          };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleUserNameChange = this.handleUserNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.addUserName = this.addUserName.bind(this);
    }

/*A method that calls the function (fetchUsers()) which is
 props received from withHTTPRequests component. */
    componentDidMount(){
      this.props.fetchUsers();
    }

/* methodS which control and change the value of the input field in the form by using setState */
    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

  handleUserNameChange(event) {
    this.setState({username: event.target.value});
    }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
    }

/*A method which adds an object (newUser) to API,
 by using Post method.
}*/
  addUserName(event) {
    event.preventDefault();
    let url = 'http://api.softhouse.rocks/users';
    const newUser = {
      name: this.state.name ,
      username: this.state.username,
      email: this.state.email,
      address: {
        street: 'mock street 12',
        suite: 'mock suite',
        city: 'mock city',
        zipcode: 'mock zip',
        geo: {
          lat: 0,
          lng: 0
        }
      }
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  /*A method which remove an item from userList .*/
  removUserName = (e) => {
       alert("This is a remove user name method");
       // fetch('http://api.softhouse.rocks/users/' + 22, {
       //   method: 'delete'
       // })
       // .then(response => response.json())
     }

  /*A method which changes the color of the text of user by change the state of the color
  from true till false or vice versa by using setState. */
  toggleColor = (e) => {
       this.setState({
         color: !this.state.color
       })
    }

/*We render two card's components*/
  render(){
    return (
      <Fragment>
        <Container>
          <Row>
            <Col  lg="6">
              <div >
                <CardComponent >
                  <ListGroup>
                    {/*We render the newuserList array by using map method and we use (user.id) as a key.*/}
                    {this.props.userList.map((user) =>
                    <UserListComponent key={user._id} color={this.state.color} user={user} />
                    )}
                </ListGroup>
                <div>
                {/*We call toggleColor method when we click the button .*/}
                <Button variant="warning" onClick={() =>this.toggleColor(this.state.color)}>Toggle color</Button>
                </div>
                <br />
              </CardComponent>
            </div>
          </Col>

          <Col  lg="6">
            <div >
              <CardComponent >
                <Form onSubmit={this.addUserName}>
                  <Form.Control className="inputForm" size="lg" type="text" placeholder="Enter name"
                   required="required" value={this.state.name}  onChange={this.handleNameChange} />
                  <br />
                  <Form.Control className="inputForm" size="lg" type="text" placeholder="Enter username"
                   required="required" value={this.state.username}  onChange={this.handleUserNameChange} />
                  <br />
                  <Form.Control className="inputForm" size="lg" type="email" placeholder="Enter email"
                   required="required" value={this.state.email}  onChange={this.handleEmailChange} />
                  <br />
                  {/*We call addUserName method when we click the submit button in the form .*/}
                  <Button variant="success" type="submit">  Add user name</Button>
                </Form>
                <br />
                <div>
                {/*We call removUserName method when we click the button .*/}
                <Button variant="danger" onClick={this.removUserName}>Remove user name</Button>
                </div>
                <br />
            </CardComponent>
          </div>
        </Col>
      </Row>
    </Container>
  </Fragment>
    );
  }
}

export default withHTTPRequests(DashBoardComponent);
