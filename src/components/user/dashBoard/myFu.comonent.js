import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserService from "../../../services/user.service";
import LocationImg from "../../../assets/Icons/location.svg";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import FuDetailModal from "../../../helpers/fuModal";
import "react-circular-progressbar/dist/styles.css";

import { useInterval } from "../../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../../constants/variables";
import { CircularProgressbar } from "react-circular-progressbar";
import { CSR_IMAGE } from "../../../constants/variables";
import Logo from "../../../assets/Icons/App-Icon.svg";
import { alertCustom, alertDefault } from "../../../helpers/alerts";

import { Link } from "react-router-dom";
import parse from "html-react-parser";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AdminService from "../../../services/admin.service";

const HorizontalLine = () => {
  return (
    <div
      style={{
        boxShadow: "0 0 25px 0 rgba(201,208,230,0.38)",
      }}
    >
      <hr className=" border-4 border-top "></hr>
    </div>
  );
};

const Info = (props) => {
  const { reason } = props;
  return (
    <OverlayTrigger
      delay={{ hide: 450, show: 300 }}
      overlay={(props) => <Tooltip {...props}>{reason}</Tooltip>}
      placement="top"
    >
      <i className="fa fa-info-circle" />
    </OverlayTrigger>
  );
};

const MyFundingUpdate = () => {
  const dispatch = useDispatch();
  const [fu, setFu] = useState([]);
  const [selectedFu, setSelectedFu] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [applicantList, setApplicantList] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState([]);

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.fetchFundingUpdate({ dataType: 2 }).then((res) => {
      dispatch(clearLoader());
      setFu(res.data.fundingUpdateBeans);
      setSelectedFu(res.data.fundingUpdateBeans[0]);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchFundingUpdate({ dataType: 2 }).then((res) => {
      dispatch(clearLoader());
      setFu(res.data.fundingUpdateBeans);
      setSelectedFu(res.data.fundingUpdateBeans[0]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchApplicantList = (id) => {
    UserService.fetchFundingUpdateById(id)
      .then((res) => {
        dispatch(clearLoader());

        setApplicantList(res.data.fundingUpdateApplicationBeans);
        console.log(applicantList);
        if (res.data.status !== 1) {
          alertDefault("error", res.data.message);
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

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await UserService.initiatePayment({
      amount: 1000,
      fundingUpdateId: selectedFu.id,
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { razorpayOrderId, razorpayKey, amount } = result.data;

    const options = {
      key: razorpayKey, // Enter the Key ID generated from the Dashboard
      amount: amount,

      name: "Glocal Bodh",
      description: "Test Transaction",
      image: { Logo },
      order_id: razorpayOrderId,
      handler: async function (response) {
        const data = {
          subModuleId: "",
          pricingPlanId: "",
          orderId: razorpayOrderId,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          paymentId: response.razorpay_payment_id,
          txnId: response.razorpay_payment_id,
          premium: false,
          couponCode: null,
          paidAmount: amount,
          fundingUpdateId: selectedFu.id,
        };

        UserService.makePayment(data)
          .then((res) => {
            dispatch(clearLoader());
            if (res.data.status === 1) {
              alertDefault("success", "Payment Successfully Done");
            } else {
              alertDefault("error", res.data.message);
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
      },
      // prefill: {
      //   name: "Soumya Dey",
      //   email: "SoumyaDey@example.com",
      //   contact: "9999999999",
      // },
      // notes: {
      //   address: "Soumya Dey Corporate Office",
      // },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div className="row p-2" style={{ backgroundColor: "#F9F9FB" }}>
      {fu.length !== 0 && (
        <>
          <div className="col-12 col-sm-6">
            {fu.map((fu, index) => {
              return (
                <div
                  className={`custom-card mt-2 p-2 list-group-item  ${
                    selectedIndex === index && "selected-job"
                  }`}
                  key={index}
                  onClick={(e) => {
                    setSelectedFu(fu, index);
                    setSelectedIndex(index);
                    setApplicantList([]);
                  }}
                >
                  <div className="d-flex mt-2 active-job">
                    <div className="company-logo-bg-none">
                      {" "}
                      <span
                        style={{
                          position: "relative",
                          top: "30%",
                          left: "40%",
                        }}
                      >
                        {fu.title[0]}
                      </span>
                    </div>

                    <div className="me-auto w-50 ps-2">
                      <div className="text-break">
                        <span style={{ fontSize: "0.9rem" }}>
                          <strong>{fu.title}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="me-n3">
                      <span className="expire-text p-2">{fu.expiryLabel}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    {fu.applicantCount !== 0 ? (
                      <button
                        className="btn btn-danger ms-1 lg-ms-3 rounded-pill btn-sm"
                        onClick={() => {
                          setSelectedFu(fu);
                          fetchApplicantList(fu.id);
                        }}
                      >
                        View Applicant Details
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger ms-1 rounded-pill btn-sm"
                        disabled
                      >
                        No Applicants
                      </button>
                    )}
                    {!fu.paymentDone && (
                      <button
                        className="btn btn-primary d-inline  rounded-pill ms-2 btn-sm"
                        onClick={(e) => {
                          displayRazorpay();
                        }}
                      >
                        Make Payement
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {applicantList ? (
            <div className="col-12 col-sm-6 mt-2 d-none d-md-block d-lg-block custom-card p-2 text-xs">
              {applicantList.map((applicant) => {
                return (
                  <div
                    className="bg-gray-100 rounded-lg p-2"
                    key={applicant.userId}
                  >
                    <div className="flex gap-2">
                      <div className="w-2/3 mt-2 fw-bolder  rounded-lg bg-blue-100 p-2">
                        {applicant.name}
                      </div>
                      <div className="w-25 mt-2 fw-bolder  rounded-lg bg-gray-100 p-1">
                        {applicant.email}
                      </div>{" "}
                      <div className="w-25 mt-2 fw-bolder  rounded-lg bg-gray-100 p-1">
                        {applicant.contactNumber}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-1/2">
                        <div className="flex flex-wrap  gap-2 p-1">
                          <div className="w-1/4  text-center ">
                            <img
                              src={CSR_IMAGE["Legal Compliances"]}
                              alt="legal compliance"
                              className="w-100"
                            />
                            <div
                              className="text-center mx-auto mt-2"
                              style={{ width: "55%" }}
                            >
                              <CircularProgressbar value={66} text={`${66}%`} />
                            </div>

                            <span className="text-xs">Csr Name</span>
                          </div>
                          <div className="w-1/4  text-center ">
                            <img
                              src={CSR_IMAGE["Legal Compliances"]}
                              alt="legal compliance"
                              className="w-100"
                            />
                            <div
                              className="text-center mx-auto mt-2"
                              style={{ width: "55%" }}
                            >
                              <CircularProgressbar value={66} text={`${66}%`} />
                            </div>

                            <span className="text-xs">Csr Name</span>
                          </div>
                        </div>{" "}
                      </div>
                      <div className="w-1/2 mt-2">
                        <div className="flex gap-2">
                          <div className="w-1/2  rounded-lg bg-blue-500 p-2 text-white">
                            Team Size
                          </div>
                          <div className="w-1/2  rounded-lg bg-blue-100 p-2">
                            {applicant.fullTime}
                          </div>
                        </div>
                        <div className="w-100  rounded-lg bg-red-100 p-2 mt-2">
                          <span>Experience in similar projects</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {" "}
                          <img
                            src={LocationImg}
                            className="me-1 inline"
                            alt="Location svg"
                          />
                          <div className="w-25 text-white  rounded-lg bg-red-500 p-2">
                            {applicant.headLocation.name}
                          </div>
                          {applicant.cityBeans.map((city) => {
                            return (
                              <div className="w-25 text-white  rounded-lg bg-red-500 p-2">
                                {city.name}
                              </div>
                            );
                          })}
                        </div>
                        <div className="w-100 rounded-lg bg-yellow-500 p-2 mt-2 text-white">
                          Target Audience
                        </div>

                        <div className="w-100 mt-2">
                          <button
                            className="btn btn-primary d-inline rounded-pill btn-sm"
                            onClick={(e) => {
                              setSelectedApplicant(applicant);
                              setModalShow(true);
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>sdnjkfsdnk</div>
          )}
          {modalShow && (
            <FuDetailModal
              data={selectedApplicant}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyFundingUpdate;
