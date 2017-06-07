import React from 'react'
import { Link } from 'react-router'

const SelectedUser= (props) => {
  const user = props.selected

  return (
    <div className="panel panel-default">
      <div className="panel-body">
          <div className="media">
              <div align="center">
                  <img className="thumbnail img-responsive" src="https://lut.im/7JCpw12uUT/mY0Mb78SvSIcjvkf.png" width="300px" height="300px"/>
              </div>
              <div className="media-body">
                  <hr/>
                  <h3><strong>{user.name}</strong></h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel gravida metus, non ultrices sapien. Morbi odio metus, dapibus non nibh id amet.</p>
                  <hr/>
                  <h3><strong>email</strong></h3>
                  <p>{user.email}</p>
                  <hr/>
                  <h3><strong>Birthday</strong></h3>
                  <p>January 01 1901</p>
              </div>
          </div>
      </div>
  </div>
  )
}

export default SelectedUser;
