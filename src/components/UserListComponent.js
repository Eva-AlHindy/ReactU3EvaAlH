/*
UserListComponent (UserComponent) is a function component which we use to show the user's data.
*/
import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

/* we definde two color red and green to toggle the text of  the user's data
(whish is: props.user from DashBoardComponent)  between them.*/

const redColor = '#DC2601';
const greenColor = '#26B001';

  function UserListComponent(props){
  /*We test the poperty of the color, if it is true so the color will be red and if it is false the color will be green.*/
    return  (
      <ListGroup.Item className="userListItem" >
        <Link style={{color: props.color ? redColor : greenColor}} to={"/user/"+props.user.id}>
          { props.user.name}
        </Link>
      </ListGroup.Item>)
  }
/* userList is an array and evry item is an object, so it has propTypes as shape.*/
  UserListComponent.propTypes = {
      user: PropTypes.PropTypes.shape({
                            id: PropTypes.number,// throws a warning if the id is not a number.
                            name: PropTypes.string,// throws a warning if the name is not a string.
                            username:  PropTypes.string,
                            email:  PropTypes.string,
                            address: PropTypes.PropTypes.shape({
                                      street: PropTypes.string,
                                      suite: PropTypes.string,
                                      city: PropTypes.string,
                                      zipcode: PropTypes.string,
                                      geo :PropTypes.PropTypes.shape({
                                        lat:  PropTypes.number,
                                        lng:  PropTypes.number
                                      }),
                                  }),
                            }),
      color: PropTypes.bool
  };
export default UserListComponent;
