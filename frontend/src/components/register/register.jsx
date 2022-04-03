import React, { Component } from 'react';

export class Register extends Component {
  render () {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username" className="control-label">
                Name
              </label>
              <input type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="control-label">
                Email
              </label>
              <input type="text" className="form-control" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <input type="text" name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm" className="control-label">
                Confirm Password
              </label>
              <input type="text" name="passwordConfirm" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
