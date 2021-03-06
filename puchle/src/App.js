
import './App.css';

import React, { Component } from "react";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      phone:null,
      email: null,
      collegeName: null,
      grade: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        phone:"",
        email: "",
        collegeName: "",
        grade: "",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        phone:${this.state.phone}
        Email: ${this.state.email}
        College Name: ${this.state.collegeName}
        Grade: ${this.state.grade}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;

      case "collegeName":
        formErrors.collegeName =
        value.length < 2 ? "minimum 2 character required" : "";
        break;

      case "phone":
          formErrors.phone = value.length != 10 ? "10 numbers required": "";
          break;

      case "grade":
        formErrors.grade =
        value.length < 1 ? "minimum 1 character required" : "";
        break;


      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>





            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="collegeName">
              <label htmlFor="collegeName">College Name</label>
              <input
                className={formErrors.collegeName.length > 0 ? "error" : null}
                placeholder="College Name"
                type="text"
                name="collegeName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.collegeName.length > 0 && (
                <span className="errorMessage">{formErrors.collegeName}</span>
              )}
            </div>

            <div className="grade">
              <label htmlFor="grade">Phone</label>
              <input
                className={formErrors.phone.length != 10  ? "error" : null}
                placeholder="phone"
                type="number"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length != 10 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
            </div>

            <div className="grade">
              <label htmlFor="grade">Grade</label>
              <input
                className={formErrors.grade.length > 0 ? "error" : null}
                placeholder="Grade"
                type="number"
                name="Grade"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.grade.length > 0 && (
                <span className="errorMessage">{formErrors.grade}</span>
              )}
            </div>


            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;