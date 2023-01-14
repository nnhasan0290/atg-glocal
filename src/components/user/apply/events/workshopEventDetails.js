import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { clearLoader, setLoader } from "../../../../store/actions/loader";
import UserService from "../../../../services/user.service";
import { alertCustom } from "../../../../helpers/alerts";
import RegisterWorkshopEvent from "./registerWorkshopEvent";
import "../../../../assets/workshopEventDetails.css";
import Language from "../../../../assets/lang.png";
import Bell from "../../../../assets/bell.png";
import Search from "../../../../assets/search.png";
import Calendar from "../../../../assets/calendar.png";
import Location from "../../../../assets/location.png";
import EventIcon from "../../../../assets/event-icon.png";
import Logo from "../../../../assets/gb.png";
import Chair from "../../../../assets/chair.png";
import Note from "../../../../assets/event_note.png";
import Rupee from "../../../../assets/currency_rupee.png";
import "reactjs-popup/dist/index.css";
import { ShareButton } from "react-custom-share";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
function WorkshopEventDetails(props) {
  //add active class name
  const [summaryActive, setSummaryActive] = useState(false);
  const [shareToggle, setShareToggle] = useState(false);
  const [topicsActive, setTopicsActive] = useState(false);
  const [otherActive, setOtherActive] = useState(false);
  const [copied, setCopied] = useState(false);
  var el = document.createElement("a");
  el.href = window.location.href;
  const shareButtonProps = [
    {
      url: el.href,
      network: "Facebook",
      text: "checkout this event",
      longtext: "Don't miss out on the opportunity!",
    },
    {
      url: el.href,
      network: "Email",
      text: "checkout this event",
      longtext: "Don't miss out on the opportunity!",
    },
    {
      url: el.href,
      network: "WhatsApp",
      text: "checkout this event",
      longtext: "Don't miss out on the opportunity!",
    },
    {
      url: el.href,
      network: "Twitter",
      text: "checkout this event",
      longtext: "Don't miss out on the opportunity!",
    },
    {
      url: el.href,
      network: "Linkedin",
      text: "checkout this event",
      longtext: "Don't miss out on the opportunity!",
    },
  ];

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  // const shareBtn = document.getElementsByClassName("share-btn");
  const shareOptions = document.getElementsByClassName("share-options");
  // shareBtn.addEventListener("click", () => {
  //   shareOptions.classList.toggle("active");
  // });
  // window.onload = function () {
  //   shareBtn.addEventListener("click", () => {
  //     shareOptions.classList.toggle("active");
  //   });
  // };
  // document.addEventListener("DOMContentLoaded", function () {
  //   shareBtn.addEventListener("click", () => {
  //     shareOptions.classList.toggle("active");
  //   });
  // });

  // const addClass = () => {
  //   if (window.scrollY >= 50) {
  //     setSummaryActive(true);
  //     setTopicsActive(false);
  //     setOtherActive(false);
  //   } else if (window.scrollY >= 500) {
  //     setSummaryActive(false);
  //     setTopicsActive(true);
  //     setOtherActive(false);
  //     console.log("past 500 mark");
  //   } else if (window.scrollY >= 900) {
  //     setSummaryActive(false);
  //     setTopicsActive(false);
  //     setOtherActive(true);
  //   } else {
  //     setSummaryActive(false);
  //     setTopicsActive(false);
  //     setOtherActive(false);
  //   }
  // };
  // window.addEventListener("scroll", addClass);
  const addClassSummary = () => {
    setSummaryActive(true);
    setTopicsActive(false);
    setOtherActive(false);
  };
  const addClassTopics = () => {
    setSummaryActive(false);
    setTopicsActive(true);
    setOtherActive(false);
  };
  const addClassOther = () => {
    setSummaryActive(false);
    setTopicsActive(false);
    setOtherActive(true);
  };

  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();
  const dispatch = useDispatch();
  const [workshopDetails, setWorkshopDetails] = useState();
  const onSubmit = () => {
    window.scrollTo(0, 0);
  };
  const { id } = props.match.params;
  useEffect(() => {
    UserService.getEventDetails(id, 1)
      .then((res) => {
        setWorkshopDetails(res.data.eventBean);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!workshopDetails) {
    dispatch(setLoader());
    return null;
  } else {
    dispatch(clearLoader());
    return (
      <div>
        {isSubmitSuccessful ? (
          <RegisterWorkshopEvent workshopDetails={workshopDetails} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="screen">
              <div className="topBar">
                <div className="shopping-cart">
                  <div className="logo50x50 left">
                    <img src={Logo} className="logo50x50" alt="" />
                  </div>
                  <ul className="right tools">
                    <li className="language tool">
                      <img src={Language} alt="" />
                    </li>
                    <li className="bell tool">
                      <img src={Bell} alt="" />
                    </li>
                    <li className="search tool">
                      <img src={Search} alt="" />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="banner ">
                <div className="days_remaining">
                  <p className="days_remaining_text">
                    {workshopDetails.daysToExpiry}
                  </p>
                </div>
              </div>
              <div className="navBar">
                <div
                  id="summaryLink"
                  onClick={addClassSummary}
                  className={summaryActive ? "link active" : "link"}
                >
                  <a className="link_text" href="#summary">
                    Summary
                  </a>
                </div>
                <div
                  id="topicsLink"
                  onClick={addClassTopics}
                  className={topicsActive ? "link active" : "link"}
                >
                  <a className="link_text" href="#topics">
                    Topics
                  </a>
                </div>
                <div
                  id="otherLink"
                  onClick={addClassOther}
                  className={otherActive ? "link active" : "link"}
                >
                  <a className="link_text" href="#other">
                    Other Details
                  </a>
                </div>
              </div>

              <div className="details_container">
                <div id="mainDetails" className="main_details">
                  <div className="frame8157 detailsCard">
                    <div className="frame8176">
                      <div className="title_section">
                        <div className="event-icon">
                          <img className="event-img" src={EventIcon} alt="" />
                        </div>
                        <div className="title_organisedBy">
                          <div className="title">
                            <p className="LongTitle">
                              {workshopDetails.title}{" "}
                            </p>
                          </div>
                          <div className="organisedBy">
                            <div className="orgContainer">
                              <p className="orgName">
                                {workshopDetails.postedBy}{" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr style={{ width: "315px" }} />
                      <div className="frame8175">
                        <div className="contents event_dates">
                          <div className="calendarIcon tiny-icon">
                            <img
                              className="calanderIconImg tiny-iconImg"
                              src={Calendar}
                              alt=""
                            />
                          </div>
                          {/* <div className="duration details_description ">
                            <p className="start date details_description ">
                              {workshopDetails.eventTime}{" "}
                            </p>
                            <p className="end date details_description">end</p>
                          </div> */}
                          <div className="timing details_description">
                            On: {workshopDetails.eventTimeText}{" "}
                          </div>
                        </div>
                        <div className="contents venue">
                          <div className="pin-pointIcon tiny-icon">
                            <img
                              className="pin-pointIconImg tiny-iconImg"
                              src={Location}
                              alt=""
                            />
                          </div>
                          <div className="location details_description value">
                            {workshopDetails.venue}{" "}
                          </div>
                        </div>
                        <div className="contents lastDayOfRegisteration">
                          <div className="calendarIcon tiny-icon">
                            <img
                              className="calendarIconImg tiny-iconImg"
                              src={Note}
                              alt=""
                            />
                          </div>
                          <div className="lastDate details_description key">
                            Last Date: {workshopDetails.applicationDeadlineText}{" "}
                          </div>
                          {/* <div className="closingDate value">
                            {workshopDetails.applicationDeadline}{" "}
                          </div> */}
                        </div>
                        <div className="two-in-one">
                          <div className="contents availableSeats">
                            <div className="chairIcon tiny-icon">
                              <img
                                className="chairIconImg tiny-iconImg"
                                src={Chair}
                                alt=""
                              />
                            </div>
                            <div className="seatsAvailable details_description key">
                              Total Seats: {workshopDetails.totalSeats}{" "}
                            </div>
                            <div className="value seatsLeft"></div>
                          </div>
                          <div className="contents language">
                            <div className="languageIcon tiny-icon">
                              <img
                                className="languageIconImg tiny-iconImg"
                                src={Language}
                                alt=""
                              />
                            </div>
                            <div className="language details_description key">
                              Language:
                            </div>
                            <div className="value modeOfLanguage"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="frame8172">
                      <div className="row-frame">
                        {workshopDetails.fees === 0 ? (
                          <div className="price priceImg left">
                            {/* <img className="rupee" src={Rupee} alt="" /> */}
                            Free!
                          </div>
                        ) : (
                          <div className="price priceImg left">
                            <img className="rupee" src={Rupee} alt="" />
                            {workshopDetails.fees}{" "}
                          </div>
                        )}

                        <div className="frame8173 right">
                          <div className="frame3842">
                            <div className="likedBy">Liked by</div>
                            <div className="elipses">
                              <img src="" alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="summary" className="detailsCard">
                  {
                    (workshopDetails.description =
                      workshopDetails.description.replace(/<(.|\n)*?>/g, ""))
                  }
                </div>

                <div id="topics" className="topics detailsCard">
                  Topics:{" "}
                  {
                    (workshopDetails.topicsCovered =
                      workshopDetails.topicsCovered.replace(/<(.|\n)*?>/g, ""))
                  }{" "}
                </div>
                <div id="other" className="other_deets detailsCard">
                  Other details: {workshopDetails.speakers}{" "}
                </div>
              </div>
              <div className="footer">
                <div className="btn-container">
                  <div>
                    {" "}
                    <button className="register" type="submit">
                      Register
                    </button>
                  </div>{" "}
                  <div className="container">
                    <div
                      className="share-btn"
                      onClick={() => {
                        shareToggle
                          ? setShareToggle(false)
                          : setShareToggle(true);
                      }}
                    ></div>
                    <div
                      className={
                        shareToggle ? "share-options active" : "share-options"
                      }
                    >
                      <p className="title">share</p>
                      <div className="social-media?">
                        <ShareButton
                          {...shareButtonProps[0]}
                          className="social-media-btn"
                        >
                          <FaFacebook />
                        </ShareButton>
                        <ShareButton
                          {...shareButtonProps[1]}
                          className="social-media-btn"
                        >
                          <FaEnvelope />
                        </ShareButton>
                        <ShareButton
                          {...shareButtonProps[2]}
                          className="social-media-btn"
                        >
                          <FaWhatsapp />
                        </ShareButton>
                        <ShareButton
                          {...shareButtonProps[3]}
                          className="social-media-btn"
                        >
                          <FaTwitter />
                        </ShareButton>
                        <ShareButton
                          {...shareButtonProps[4]}
                          className="social-media-btn"
                        >
                          <FaLinkedin />
                        </ShareButton>
                      </div>
                      <div className="link-container">
                        <p className="link">{el.href}</p>
                        <h1 className="copy-btn" onClick={copy}>
                          copy
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isLoading } = state.loader;
  return {
    isLoading,
  };
}

export default connect(mapStateToProps)(WorkshopEventDetails);
