import React from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardBody,
  Container,
  Row,
  Col,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import imgJob from "../../assets/Icons/reports.svg";
// import imgEvents from "../../assets/Icons/events.svg";
// import imgRFP from "../../assets/Icons/RFP.svg";
// import imgFunding from "../../assets/Icons/Fundings.svg";
// import imgWorkshop from "../../assets/Icons/workshop.svg";
// import imgAwards from "../../assets/Icons/awards.svg";

const HomeAdmin = (props) => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Container>
      <Row>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Jobs</CardTitle>
              <Link to="/admin/reviewJob">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">News</CardTitle>
              <Link to="/admin/createNews">
                <Button className="mt-3" color="primary">
                  Create
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Manage Users</CardTitle>
              <Link to="/admin/manageUsers">
                <Button className="mt-3" color="primary">
                  Explore
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>

        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">GC List</CardTitle>
              <Link to="/admin/gcData">
                <Button className="mt-3" color="primary">
                  Explore
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Events</CardTitle>
              <Link to="/admin/reviewEvent">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">Review Funding</CardTitle>
              <Link to="/admin/reviewFund">
                <Button className="mt-3" color="primary">
                  Review
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={3}>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">User List</CardTitle>
              <Link to="/admin/newUserList">
                <Button className="mt-3" color="primary">
                  Search
                </Button>
              </Link>
            </CardBody>
          </Card>
          <Card className="custom-card">
            <CardImg
              className="mx-auto"
              src={imgJob}
              alt="Card image cap"
              style={{ width: "50%", height: "100px" }}
            />
            <CardBody className="text-center">
              <CardTitle tag="h5">User List</CardTitle>
              <Link to="/admin/dashboard/events">
                <Button className="mt-3" color="primary">
                  dashboard
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeAdmin;
