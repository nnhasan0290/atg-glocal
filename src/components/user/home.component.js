import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../assets/youtube.css";
import "../../assets/whatsapp.css";
import imgJob from "../../assets/Icons/reports.svg";
import imgEvents from "../../assets/Icons/events.svg";
import imgRFP from "../../assets/Icons/RFP.svg";
import imgFunding from "../../assets/Icons/fundig-updates.svg";
import imgWorkshop from "../../assets/Icons/workshop.svg";
import imgAwards from "../../assets/Icons/reports.svg";
import YouTube from "../../assets/YouTube.png";
import Popup from "../../helpers/popup";
import "../../assets/popup.css";

const Home = (props) => {
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);
  const { paidModulesBean } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function isActive(id) {
    if (paidModulesBean.length === 0) {
      return true;
    } else {
      let data = paidModulesBean.filter((obj) => obj.active === true);
      if (data) {
        if (data.find((obj) => obj.id === id)) {
          return !data.find((obj) => obj.id === id).active;
          // return true;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }

  function allowedEvents() {
    let allowedSection = paidModulesBean.filter(
      (paidModulesBean) => paidModulesBean.active === true
    );
    let final = allowedSection.map((paidModulesBean) => paidModulesBean.id);
    let events = ["2", "3", "4"];

    let found = events.some((r) => final.includes(r));
    return !found;
  }
  function getPaidModule(id) {
    let data;
    const allowedSection = paidModulesBean.filter(
      (paidModulesBean) => paidModulesBean.active === true
    );
    const section = allowedSection.find(
      (paidModulesBean) => paidModulesBean.id === id
    );

    if (section) {
      data = {
        expiryDate: section.expiryDateText,
        packageMode: section.premium,
      };

      return data;
    }
    return {
      expiryDate: "",
      packageMode: "",
    };
  }

  return (
    <Container>
      <Row>
        <Col className="mx-auto" xs={12} sm={5}>
          <div className="text-center YT-center">
            <a
              href="https://youtu.be/ADqFKQGAP-U"
              class="youtube_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img class="youtube-icon" src={YouTube} />
            </a>
            <a
              href="https://youtu.be/ADqFKQGAP-U"
              class="youtube_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="YT-text-btn btn btn-primary">
                Check our video to understand the process
              </button>
            </a>
          </div>

          <div className="whatsapp_container">
            <a
              href="https://api.whatsapp.com/send?phone=919004810804&text=Tell me about GlocalBodh"
              class="whatsapp_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="whatsapp_msg">Hi! Connect with us on WhatsApp</p>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=919004810804&text=Tell me about GlocalBodh"
              class="whatsapp_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa fa-whatsapp whatsapp-icon"></i>
            </a>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={3}>
          <Card
            // className={
            //   isActive("1") ? "disabled-card custom-card" : "custom-card"
            // }
            className="custom-card"
          >
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Lets Start Posting a Job</h6>
              </CardTitle>

              <Button
                className="mt-2"
                color="primary"
                style={{ textDecoration: "none" }}
              >
                {" "}
                <Link
                  to={{
                    pathname: "/user/create/job",
                    state: {
                      expiryText: getPaidModule("1").expiryDate,
                      package: getPaidModule("1").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
            // className={
            //   allowedEvents() ? "disabled-card custom-card" : "custom-card"
            // }
          >
            <CardImg
              className="mx-auto"
              src={imgEvents}
              alt="Card image cap"
              style={{ width: "50%", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Create Event, Workshop ...</h6>
              </CardTitle>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret color="primary" className="mt-2">
                  Create
                </DropdownToggle>
                <DropdownMenu style={{ width: "270px" }}>
                  {/* <DropdownItem disabled={isActive("2")}> */}
                  <DropdownItem>
                    <Link
                      to={{
                        pathname: "/user/create/event/workshopEvent",
                        state: {
                          expiryText: getPaidModule("2").expiryDate,
                          package: getPaidModule("2").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <span>
                        <img
                          className="inline"
                          src={imgWorkshop}
                          width="50"
                          alt="workshop"
                        />
                      </span>
                      Workshops and Training
                    </Link>
                  </DropdownItem>

                  {/* <DropdownItem disabled={isActive("4")}> */}
                  <DropdownItem>
                    <Link
                      to={{
                        pathname: "/user/create/event/exhibitionEvent",
                        state: {
                          expiryText: getPaidModule("4").expiryDate,
                          package: getPaidModule("4").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <span>
                        <img
                          className="inline"
                          src={imgWorkshop}
                          width="50"
                          alt="workshop"
                        />
                      </span>
                      Event/Exhibition{" "}
                    </Link>
                  </DropdownItem>

                  {/* <DropdownItem disabled={isActive("3")}> */}
                  <DropdownItem>
                    <Link
                      to={{
                        pathname: "/user/create/event/awardEvent",
                        state: {
                          expiryText: getPaidModule("3").expiryDate,
                          package: getPaidModule("3").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <span>
                        <img
                          className="inline"
                          src={imgAwards}
                          width="50"
                          alt="workshop"
                        />
                      </span>
                      Awards/Competitions
                    </Link>
                  </DropdownItem>
                  {/* <DropdownItem disabled={isActive("8")} className="mt-2"> */}
                  {/* <DropdownItem className="mt-2">
                    <Link
                      to={{
                        pathname: "/user/fundingUpdateNew",
                        state: {
                          expiryText: getPaidModule("8").expiryDate,
                          package: getPaidModule("8").packageMode,
                        },
                      }}
                      style={{ textDecoration: "none" }}
                    >
                      <span>
                        <img
                          className="inline"
                          src={imgAwards}
                          width="50"
                          alt="workshop"
                        />
                      </span>
                      Funding Update New
                    </Link>
                  </DropdownItem> */}
                </DropdownMenu>
              </Dropdown>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
            // className={
            //   isActive("9") ? "disabled-card custom-card" : "custom-card"
            // }
          >
            <CardImg
              className="mx-auto"
              src={imgRFP}
              alt="Card image cap"
              style={{ width: "50%", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Create Request for Proposal</h6>
              </CardTitle>

              <Button className="mt-2" color="primary">
                {" "}
                <Link
                  to={{
                    pathname: "/user/rfp",
                    state: {
                      expiryText: getPaidModule("9").expiryDate,
                      package: getPaidModule("9").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create{" "}
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
            // className={
            //   isActive("8") ? "disabled-card custom-card" : "custom-card"
            // }
          >
            <CardImg
              className="mx-auto"
              src={imgFunding}
              alt="Card image cap"
              style={{ width: "", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Create Funding Update</h6>
              </CardTitle>

              <Button className="mt-2" color="primary">
                <Link
                  to={{
                    pathname: "/user/create/fundingUpdate",
                    state: {
                      expiryText: getPaidModule("8").expiryDate,
                      package: getPaidModule("8").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create{" "}
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={3}>
          <Card
            className="custom-card"
            // className={
            //   isActive("6") ? "disabled-card custom-card" : "custom-card"
            // }
          >
            <CardImg
              className="mx-auto"
              src={imgFunding}
              alt="Card image cap"
              style={{ width: "", height: "81px" }}
            />
            <CardBody className="text-center">
              <CardTitle>
                <h6>Academics</h6>
              </CardTitle>

              <Button className="mt-2" color="primary">
                <Link
                  to={{
                    pathname: "/user/academics",
                    state: {
                      expiryText: getPaidModule("6").expiryDate,
                      package: getPaidModule("6").packageMode,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Create{" "}
                </Link>
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Popup className="popUp" trigger={timedPopup} setTrigger={setTimedPopup}>
        <div className="inner-popUp">
          <h3 className="know-services">
            <a
              target="_blank"
              className="explore"
              href="https://glocalbodh.webflight.in/"
            >
              Click Here{" "}
            </a>{" "}
            to know our services
          </h3>
        </div>
      </Popup>
    </Container>
  );
};

function mapStateToProps(state) {
  const { kycStatusText } = state.kycStatus;
  const { paidModulesBean } = state.paidModules;
  const { user } = state.auth;

  return {
    kycStatusText,
    paidModulesBean,
    user,
  };
}

export default connect(mapStateToProps)(Home);
