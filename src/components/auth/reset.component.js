import React, { useState } from "react";
import { connect } from "react-redux";

import { Form, InputGroup, Button } from "../../utils/inputs";
import Logo from "../../assets/Icons/App-Icon.svg";

import { resetPassword } from "../../store/actions/auth";
import { validationSchemaReset } from "../../constants/schema";
import { alertCustom, alert } from "../../helpers/alerts";

import * as QueryString from "query-string";

const ResetPassword = (props) => {
  console.log(props);
  const value = QueryString.parse(props.location.search);
  const id = value.requestId;
  //console.log(id);
  const { message } = props;
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    const { dispatch } = props;

    dispatch(resetPassword(data.newPassword, id))
      .then((res) => {
        setLoading(false);
        if (res.data.status === 1) {
          alertCustom("success", "Password Successfully Changed", "/login");
        } else {
          alert("error", res.data.message);
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
          <h5 className='text-muted'>Reset Password</h5>
        </div>

        <div className='card-body col-12 col-sm-12'>
          <div className='mx-auto'>
            <Form onSubmit={onSubmit} schema={validationSchemaReset}>
              <InputGroup
                type='password'
                name='newPassword'
                placeholder='New Password'
                icon='fa fa-lock'
              />

              <InputGroup
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                icon='fa fa-lock'
              />
              <Button name='Submit' isLoading={isLoading} />
            </Form>
          </div>

          {message && (
            <div className='form-group mt-2'>
              <div className='alert alert-success' role='alert'>
                {message}
              </div>
            </div>
          )}
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

export default connect(mapStateToProps)(ResetPassword);
