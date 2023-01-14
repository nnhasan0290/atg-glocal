import React, { useState } from "react";
import { connect } from "react-redux";
import Logo from "../../assets/Icons/App-Icon.svg";

import { Form, InputGroup, Button } from "../../utils/inputs";

import { forgotPassword } from "../../store/actions/auth";
import { alertCustom, alert } from "../../helpers/alerts";
import { validationSchemaForgotPassword } from "../../constants/schema";

const ForgotPassword = (props) => {
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    const { dispatch } = props;
    setLoading(true);

    dispatch(forgotPassword(data.email))
      .then((res) => {
        setLoading(false);
        if (res.data.status === 1) {
          alertCustom("success", "Link Sent Successfully", "/login");
        } else {
          alert("error", res.data.message);
        }
      })
      .catch(() => {
        console.log("failed");
      });
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
          <h4>Welcome Back !</h4>
          <h5 className='text-muted'>
            Enter your email address and we will send you a link to reset your
            password.
          </h5>
        </div>

        <div className='card-body col-12 col-sm-12'>
          <div className='mx-auto'>
            <Form onSubmit={onSubmit} schema={validationSchemaForgotPassword}>
              <InputGroup type='text' name='email' />

              <Button name='Send password reset email' isLoading={isLoading} />
            </Form>
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

export default connect(mapStateToProps)(ForgotPassword);
