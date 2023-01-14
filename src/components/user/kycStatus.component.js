import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Oops from "../../assets/Icons/Oops.svg";
import Success_Icon from "../../assets/Icons/success-icon.svg";
import Pending from "../../assets/Icons/pending-icon.svg";
import { BeatLoader } from "react-spinners";

import Tick from "../../assets/Icons/pay-tick.svg";
import Error from "../../assets/Icons/error.svg";
import NoImage from "../../assets/Icons/no-img.svg";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to='/login' />;
    }

    const renderKycDetails = (status) => {
      switch (status) {
        case 1:
          return (
            <div>
              <div>
                <img className='inline' src={Oops} alt='icon' width='100'></img>
              </div>
              <div>
                <div className='mt-2'>
                  <h5>Oops !!</h5>
                  <h5>Looks like,you haven't updated your KYC details</h5>
                </div>
                <div className='mt-4'>
                  <span
                    className='rounded-pill p-3'
                    style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                  >
                    <strong>Not Applied</strong>
                  </span>
                </div>

                <div className='mt-4'>
                  <h3>Updating KYC is mandatory.</h3>
                  <h6>To Update Your KYC Click below</h6>
                </div>
                <div className='mt-4'>
                  <Link to='/user/updateKYC'>
                    <button className='btn btn-primary btn-lg'>
                      Update KYC
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div>
              <div>
                <img
                  className='inline'
                  src={Success_Icon}
                  alt='icon'
                  width='100'
                ></img>
              </div>
              <div>
                <div className='mt-3'>
                  <h4>
                    <strong>Success !!</strong>
                  </h4>
                  <p className='fs-6'>
                    Congratulations! Your KYC details has been <br />
                    added & verified successfully
                  </p>
                </div>
                <div className='mt-4'>
                  <span
                    className='rounded-pill p-2'
                    style={{ color: "#0DB71A", backgroundColor: "#EEFDEE" }}
                  >
                    <img className='inline' src={Tick} width='35' alt='tick' />
                    <strong>Verification Completed</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <div>
                <img
                  className='inline'
                  src={Pending}
                  alt='icon'
                  width='150'
                ></img>
              </div>
              <div>
                <div className='mt-2'>
                  <h3>Congratulations! Your KYC details has been</h3>
                  <h3>added successfully</h3>
                </div>

                <div className='mt-4'>
                  <span
                    className='rounded-pill p-3'
                    style={{ color: "#F1D372", backgroundColor: "#FFF9E6" }}
                  >
                    <strong>Verification Pending</strong>
                  </span>
                </div>
                <div className='mt-4'>
                  <h6>You Will be notified soon once verification is done.</h6>
                </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div>
              <div>
                <img className='inline' src={Oops} alt='icon' width='150'></img>
              </div>
              <div>
                <div className='mt-2'>
                  <h3>Oops !!</h3>
                  <h3>Your KYC updation is failed</h3>
                </div>

                <div className='mt-4'>
                  <span
                    className='rounded-pill p-3'
                    style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                  >
                    <img className='inline' src={Error} alt='error' />
                    <strong>Verification Declined</strong>
                  </span>
                </div>
                <div
                  className='mt-3 p-2'
                  style={{ backgroundColor: "#FDD8D8" }}
                >
                  <img className='inline' src={NoImage} alt='No' width='100' />
                  <p
                    className='text-danger fw-bold'
                    style={{ color: "#E74E54" }}
                  >
                    Pancard picture uploaded by you <br />
                    is not visible enough. Please make sure <br />
                    You are uploading clear Image
                  </p>
                </div>
                <div className='mt-4'>
                  <Link to='/updateKYC'>
                    <button className='btn btn-primary btn-lg'>
                      Update KYC
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
    return (
      <div className='row mt-3'>
        <div className='col-10 col-sm-4 mx-auto text-center p-5 custom-card'>
          {this.props.kycStatus.kycStatusText === "" ? (
            <div
              className='d-flex align-items-center justify-content-center'
              style={{ height: "350px" }}
            >
              <BeatLoader color='#4A90E2' loading={true} size={40} />
            </div>
          ) : (
            renderKycDetails(this.props.kycStatus)
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { kycStatus } = state.kycStatus;
  return {
    user,
    kycStatus,
  };
}

export default connect(mapStateToProps)(Profile);
