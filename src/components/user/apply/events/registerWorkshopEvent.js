import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useRazorpay from "react-razorpay";
import "../../../../assets/registerStyle.css";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaWorkshopRegister } from "../../../../constants/schema";
import { clearLoader, setLoader } from "../../../../store/actions/loader";
import UserService from "../../../../services/user.service";
import { alertCustom } from "../../../../helpers/alerts";
import {
  renderCities,
  renderStates,
  renderStatesNew,
} from "../../../../services/render-services";
import GB_globe from "../../../../assets/globe-logo.png";

const RegisterWorkshopEvent = (props) => {
  const [cities, getCities] = useState([]);
  const [states, getStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState("Select City");
  var key, orderId, amount;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaWorkshopRegister) });
  var el = document.createElement("a");
  el.href = window.location.href;
  var pathArray = window.location.pathname.split("/");
  const Razorpay = useRazorpay();

  const onChangeState = (e) => {
    let stateIdx = 0;
    setSelectedStateId(e.target.value);
    for (let i = 0; i < states.length; i++) {
      if (states[i].id === e.target.value) {
        stateIdx = i;
        break;
      }
    }
    getCities(states[stateIdx].cityBeans);
    console.log(states[stateIdx].cityBeans);
  };
  useEffect(() => {
    UserService.fetchAllStates()
      .then((res) => {
        getStates(res.data.stateBeans);
        console.log(res.data.stateBeans);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  }, []);
  const onSubmit = (values) => {
    props.dispatch(setLoader());
    const data = {
      name: values.name,
      contactNumber: values.contactNumber,
      email: values.email,
      organizationName: values.organizationName,
      cityId: values.cityId,
      eventId: pathArray[3],
      eventCategoryId: "1",
    };
    UserService.registerForWorkshop(data)
      .then((res) => {
        props.dispatch(clearLoader());
        var free = {
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            UserService.paymentValidation(response.razorpay_order_id).then(
              () => {
                console.log(response.razorpay_order_id);
              }
            );
          },
        };
        if (res.data.amount === 0) {
          free();
        }
        if (res.data.status === 1) {
          amount = res.data.amount;
          orderId = res.data.razorpayOrderId;
          key = res.data.razorpayKey;

          var options = {
            key: key, // Enter the Key ID generated from the register API
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "GlocalBodh",
            description: "Test Transaction",
            image: { GB_globe },
            order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1 from the register API
            handler: function (response) {
              alert(response.razorpay_payment_id);
              alert(response.razorpay_order_id);
              alert(response.razorpay_signature);
              UserService.paymentValidation(response.razorpay_order_id).then(
                (res) => {
                  if (res.data.status === 1) {
                    alertCustom("success", "Successfully Registerd", "/home");
                  }
                  console.log(response.razorpay_order_id);
                }
              );
            },
            prefill: {
              name: data.name,
              email: data.email,
              contact: data.contactNumber,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var rzp1 = new Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
          });
          rzp1.open();
        } else {
          alertCustom("error", res.data.message, el.pathname);
          console.log(res.data);
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alertCustom("error", message, "/home");
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-floating">
      <div className="register_screen">
        <div className="topBar"></div>
        <h1 className="heading">Register</h1>
        <div className="reg-container">
          <div className="fields">
            <div className="field">
              <label>Name </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className={
                  errors.buyer_name
                    ? "form-control is-invalid input"
                    : "form-control input"
                }
              />
              {errors.buyer_name && errors.buyer_name.message ? (
                <div className="invalid-feedback">
                  {errors.buyer_name.message}
                </div>
              ) : null}
            </div>
            <div className="field">
              <label>Enter Phone Number: </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Contact Number"
                pattern="[0-9]{10}"
                {...register("contactNumber", { required: true })}
                className={
                  errors.contactNumber
                    ? "form-control is-invalid input"
                    : "form-control input"
                }
              />
              {errors.contactNumber && errors.contactNumber.message ? (
                <div className="invalid-feedback">
                  {errors.contactNumber.message}
                </div>
              ) : null}
            </div>
            <div className="field">
              <label>Enter your email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email id"
                {...register("email", { required: true })}
                className={
                  errors.email
                    ? "form-control is-invalid input"
                    : "form-control input"
                }
              />
              {errors.email && errors.email.message ? (
                <div className="invalid-feedback">{errors.email.message}</div>
              ) : null}
            </div>
            <div className="field">
              <label>
                Organization Name: <br />
                <span className="text-danger">
                  <em className="em">(put N/A if not from an organization)</em>
                </span>
              </label>

              <input
                type="text"
                id="orgName"
                name="orgName"
                placeholder="Your Organization Name"
                {...register("organizationName", { required: true })}
                className={
                  errors.orgName
                    ? "form-control is-invalid input"
                    : "form-control input"
                }
              />
              {errors.orgName && errors.orgName.message ? (
                <div className="invalid-feedback">{errors.orgName.message}</div>
              ) : null}
            </div>
            <div className="field">
              <label>You Are From?</label>
              <div className="w-95 col-6 form-group">
                <select
                  onChange={onChangeState}
                  // onClick={() => {
                  //   setSelectedState(target.value);
                  // }}
                  className=" w-95 form-select"
                >
                  {renderStatesNew(states)}
                </select>
              </div>
              <div className="w-95 col-6 form-group">
                <select
                  className={
                    errors.cityId
                      ? " w-95 form-select is-invalid"
                      : " w-95 form-select"
                  }
                  {...register("cityId")}
                >
                  {renderCities(cities)}
                </select>
                <small className="text-danger">
                  {errors.cityId && errors.cityId.message}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bookNow">
        <button
          type="submit"
          id="rzp-button1"
          className="rzp-button1 book-btn btn-primary mt-2 btn-lg"
          disabled={props.isLoading}
        >
          {props.isLoading ? "Please wait..." : "Book Now"}
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

export default connect(mapStateToProps)(RegisterWorkshopEvent);
