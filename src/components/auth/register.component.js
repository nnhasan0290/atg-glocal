import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, InputGroup, Button } from "../../utils/inputs";
import { connect } from "react-redux";
import { register } from "../../store/actions/auth";
import Logo from "../../assets/Icons/App-Icon.svg";
import { validationSchemaRegister } from "../../constants/schema";
import Swal from "sweetalert2";

const Register = (props) => {
  const [successfull, setSuccessfull] = useState(false);
  const { message } = props;

  const onSubmit = (data) => {
    const { dispatch } = props;
    dispatch(register(data.username, data.email, data.password, data.contact))
      .then((res) => {
        if (res.data.status === 1) {
          setSuccessfull(true);
          Swal.fire({
            icon: "success",
            title: "Registration Complete",
            showConfirmButton: true,
            allowEnterKey: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((res) => {
            window.location.href = "/login";
          });
        }
      })
      .catch(() => {});
  };

  return (
    <div className='col-md-12'>
      <div className='mx-auto text-center'>
        <img
          src={Logo}
          alt='profile-img'
          className='img-fluid inline'
          width='70'
        />
      </div>
      <div className='card col-12 col-sm-6 custom-card'>
        <div className='text-center'>
          {" "}
          <h4>Welcome !</h4>
          <h5 className='text-muted'>
            Enter your Details to Register for Glocal services.
          </h5>
        </div>

        <div className='card-body col-12 col-sm-12'>
          <div className='mx-auto'>
            <Form onSubmit={onSubmit} schema={validationSchemaRegister}>
              <InputGroup
                name='username'
                placeholder='Username'
                type='text'
                icon='fa fa-user'
              />
              <InputGroup
                name='email'
                placeholder='Email'
                type='text'
                icon='fa fa-envelope'
              />
              <InputGroup
                name='password'
                placeholder='Password'
                type='password'
                icon='fa fa-lock'
              />
              <InputGroup
                name='contact'
                placeholder='Contact Number'
                type='text'
                icon='fa fa-phone'
              />
              <Button name='Register' />
            </Form>
          </div>

          {message && (
            <div className='form-group mt-2'>
              <div
                className={
                  successfull ? "alert alert-success" : "alert alert-danger"
                }
                role='alert'
              >
                {message}
              </div>
            </div>
          )}
          <div className='form-group mt-2 text-center'>
            <Link to='/login' style={{ textDecoration: "none" }}>
              <span className='text-muted'>Already have an Account ?</span>{" "}
              <span style={{ color: "#0057A8" }}>Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
