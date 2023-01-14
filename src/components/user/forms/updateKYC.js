import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

import {
  renderCities,
  renderStates,
  onChangeStates,
} from "../../../services/render-services";
import { clearLoader, setLoader } from "../../../store/actions/loader";
import MyEditor from "../../../helpers/editor";

import { validationSchemaUpdateKYC } from "../../../constants/schema";
import UserService from "../../../services/user.service";
import { alert } from "../../../helpers/alerts";

const UpdateKYC = (props) => {
  const [cities, getCities] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaUpdateKYC) });
  const onChangeState = (e) => {
    onChangeStates(e.target.value).then((res) => {
      getCities(res.data);
    });
  };
  const onSubmit = (values) => {
    props.dispatch(setLoader());
    const data = {
      organizationName: values.orgName,
      officialEmail: values.orgEmail,
      organizationDetails: values.orgDetails,
      addressLine1: values.orgAddress1,
      addressLine2: values.orgAddress2,
      pinCode: values.pincode,
      city: values.city,
      state: values.state,
      websiteLink: values.orgWebsite,
      facebookProfileLink: values.faceBookLink,
      linkedInProfileLink: values.linkedInLink,
      panCardLink: values.panCardLink,
      organizationType: values.orgType,
    };
    console.log(values);

    UserService.updateKYC(data).then((res) => {
      props.dispatch(clearLoader());
      if (res.data.status === 1) {
        alert("success", "Successfully Created");
      } else {
        alert("error", res.data.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center'>
        <h1>Apply For KYC</h1>
      </div>
      <div className='form-group'>
        <label htmlFor='orgName'>Organisation Name</label>
        <input
          className={
            errors.orgName ? "form-control is-invalid" : "form-control"
          }
          type='text'
          {...register("orgName")}
        />
        {errors.orgName && errors.orgName.message ? (
          <div className='invalid-feedback'>{errors.orgName.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='orgEmail'>Official Email</label>
        <input
          className={
            errors.orgEmail ? "form-control is-invalid" : "form-control"
          }
          type='text'
          {...register("orgEmail")}
        />
        {errors.orgEmail && errors.orgEmail.message ? (
          <div className='invalid-feedback'>{errors.orgEmail.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='orgDetails'>About Organisation</label>
        <Controller
          name='orgDetails'
          control={control}
          rules={{ required: true }}
          className={
            errors.description ? "form-control is-invalid" : "form-control"
          }
          render={(field) => <MyEditor {...field} errors={errors} />}
        />
        <small className='text-danger'>
          {errors.orgDetails && errors.orgDetails.message}
        </small>
      </div>

      <div className='row'>
        <div className='col-6 form-group'>
          <label>Address Line 1</label>
          <input
            className={
              errors.orgAddress1 ? "form-control is-invalid" : "form-control"
            }
            type='text'
            {...register("orgAddress1")}
          />
          {errors.orgAddress1 && errors.orgAddress1.message ? (
            <div className='invalid-feedback'>{errors.orgAddress1.message}</div>
          ) : null}
        </div>
        <div className='col-6 form-group'>
          <label>Address Line 2</label>
          <input
            className={
              errors.orgAddress2 ? "form-control is-invalid" : "form-control"
            }
            type='text'
            {...register("orgAddress2")}
          />
          {errors.orgAddress2 && errors.orgAddress2.message ? (
            <div className='invalid-feedback'>{errors.orgAddress2.message}</div>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='col-4 form-group'>
          <label>Pincode</label>

          <input
            className={
              errors.pincode ? "form-control is-invalid" : "form-control"
            }
            type='text'
            {...register("pincode")}
          />
          {errors.pincode && errors.pincode.message ? (
            <div className='invalid-feedback'>{errors.pincode.message}</div>
          ) : null}
        </div>
        <div className='col-4 form-group'>
          <label>State</label>

          <Controller
            control={control}
            name='state'
            render={({ field: { onChange, value } }) => (
              <>
                <select
                  className={
                    errors.state ? "form-select is-invalid" : "form-select"
                  }
                  onChange={(e) => {
                    onChange(e);
                    onChangeState(e);
                  }}
                >
                  {renderStates(props.states)}
                </select>
                <small className='text-danger'>
                  {errors.state && errors.state.message}
                </small>
              </>
            )}
          />
        </div>
        <div className='col-4 form-group'>
          <label>City</label>

          <select
            className={errors.city ? "form-select is-invalid" : "form-select"}
            {...register("city")}
          >
            {renderCities(cities)}
          </select>

          <small className='text-danger'>
            {errors.city && errors.city.message}
          </small>
        </div>
      </div>
      <div className='form-group'>
        <label>Organisation Type</label>
        <div className='form-check form-check-inline'>
          <label className='form-check-label' htmlFor='orgType'>
            <input
              className={
                errors.orgType
                  ? "form-check-input is-invalid"
                  : "form-check-input"
              }
              type='radio'
              {...register("orgType")}
              value='1'
            />
            Profit
          </label>
        </div>

        <div className='form-check form-check-inline'>
          <label className='form-check-label' htmlFor='orgType'>
            <input
              className={
                errors.orgType
                  ? "form-check-input is-invalid"
                  : "form-check-input"
              }
              type='radio'
              {...register("orgType")}
              value='2'
            />
            Non Profit
          </label>
        </div>

        <div className='form-check form-check-inline'>
          <label className='form-check-label' htmlFor='orgType'>
            <input
              className={
                errors.orgType
                  ? "form-check-input is-invalid"
                  : "form-check-input"
              }
              type='radio'
              {...register("orgType")}
              value='3'
            />
            CSR
          </label>
        </div>
        <small className='text-danger'>
          {errors.orgType && errors.orgType.message}
        </small>
      </div>

      <div className='form-group'>
        <label htmlFor='orgWebsite'>Website Url</label>
        <input
          {...register("orgWebsite")}
          className={
            errors.orgWebsite ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.orgWebsite && errors.orgWebsite.message ? (
          <div className='invalid-feedback'>{errors.orgWebsite.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='faceBookLink'>Facebook Url</label>
        <input
          {...register("faceBookLink")}
          className={
            errors.faceBookLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.faceBookLink && errors.faceBookLink.message ? (
          <div className='invalid-feedback'>{errors.faceBookLink.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='linkedInLink'>LinkedIN Url</label>
        <input
          {...register("linkedInLink")}
          className={
            errors.linkedInLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.linkedInLink && errors.linkedInLink.message ? (
          <div className='invalid-feedback'>{errors.linkedInLink.message}</div>
        ) : null}
      </div>
      <div className='form-group'>
        <label htmlFor='pancardLink'>Pancard Link</label>
        <input
          {...register("pancardLink")}
          className={
            errors.pancardLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.pancardLink && errors.pancardLink.message ? (
          <div className='invalid-feedback'>{errors.pancardLink.message}</div>
        ) : null}
      </div>
      <div className='form-group form-check'>
        <input
          {...register("terms")}
          className={
            errors.terms ? "form-check-input is-invalid" : "form-check-input"
          }
          type='checkbox'
        ></input>
        <label htmlFor='terms' className='form-check-label'>
          I Agree to Glocal Bodh
          <span>
            <Link
              to='/terms'
              style={{ color: "#0057A8", textDecoration: "none" }}
            >
              Terms of Service
            </Link>
          </span>
          {" and "}
          <span>
            <Link
              to='/privacyPolicy'
              style={{ color: "#0057A8", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && errors.terms.message ? (
          <div className='invalid-feedback'>{errors.terms.message}</div>
        ) : null}
      </div>

      <div className='form-group mt-2 text-center'>
        <button
          type='submit'
          className='btn btn-primary mt-2 btn-lg'
          disabled={props.isLoading}
        >
          {props.isLoading ? "Please wait..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;

  return {
    isLoading,
    states,
  };
}

export default connect(mapStateToProps)(UpdateKYC);
