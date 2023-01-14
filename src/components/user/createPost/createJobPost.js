import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
} from "reactstrap";

import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation } from "react-router-dom";
import { validationSchemaJob } from "../../../constants/schema";

import {
  renderCities,
  renderStates,
  onChangeStates,
} from "../../../services/render-services";
import { clearLoader, setLoader } from "../../../store/actions/loader";
import MyEditor from "../../../helpers/editor";
import UserService from "../../../services/user.service";
import { alertCustom } from "../../../helpers/alerts";

const CreateJobPost = (props) => {
  const [cities, getCities] = useState([]);
  const [salaryType, setSalaryType] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaJob) });
  const location = useLocation();

  const onSubmit = (values) => {
    props.dispatch(setLoader());
    let minSal, maxSal;
    if (salaryType === "fixed") {
      maxSal = minSal = values.fixedSalary;
    }
    if (salaryType === "range") {
      minSal = values.minSalary;
      maxSal = values.maxSalary;
    }
    if (salaryType === "na") {
      minSal = maxSal = 0;
    }
    const a = `<h3 style="color: #000000;">About Us</h3><br/><p>${values.aboutOrg}</p><br/><h5 style="color: #000000;">Work Place Location</h5><p>${values.orgAddress}</p>`;
    const b = `<h3 style="color: #000000;">Responsibilities</h3><p>${values.jobDescription}</p>`;
    const c = `<li>Minimum ${values.expYears} ${values.expCategory} of Experience</li>${values.requirements}`;
    const data = {
      jobDetailsBean: {
        designation: values.designation,
        companyName: values.orgName,
        companyLogo: "",
        minSalary: minSal,
        maxSalary: maxSal,
        location: values.location,
        jobDescription: b,
        companyDetails: a,
        requirement: c,
        postedBy: values.postedBy,
        externalLink: values.externalLink,
      },
      jobType: values.jobType,
      jobCategory: values.jobCategory,
      expiryDate: new Date(values.expiryDate).getTime(),
    };
    //console.log(data);
    UserService.createJob(data)
      .then((res) => {
        props.dispatch(clearLoader());
        if (res.data.status === 1) {
          alertCustom("success", "Successfully Created", "/home");
        } else {
          alertCustom("error", res.data.message, "/home");
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
  const renderSalary = (value) => {
    switch (value) {
      case "fixed":
        return (
          <FormGroup row className="mt-2">
            <Col sm={6}>
              <Input
                type="text"
                placeholder="Enter Fixed Salary"
                {...register("fixedSalary")}
              />
              <small className="text-danger">
                {errors.fixedSalary && errors.fixedSalary.message}
              </small>
            </Col>
          </FormGroup>
        );
      case "range":
        return (
          <FormGroup row className="mt-2">
            <Col sm={3}>
              <Input
                type="text"
                placeholder="Enter Minimum Salary"
                {...register("minSalary")}
              />
              <small className="text-danger">
                {errors.minSalary && errors.minSalary.message}
              </small>
            </Col>
            <Col sm={3}>
              <Input
                type="text"
                placeholder="Enter Maximum Salary"
                {...register("maxSalary")}
              />
              <small className="text-danger">
                {errors.maxSalary && errors.maxSalary.message}
              </small>
            </Col>
          </FormGroup>
        );
      default:
        return null;
    }
  };

  const onChangeState = (e) => {
    onChangeStates(e.target.value).then((res) => {
      getCities(res.data);
      // console.log(res.data);
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form-floating">
      <div className="mx-auto">
        <h1>
          Create Job Post{" "}
          <span className="ms-2 expire-text-box p-2">
            {location.state.expiryText}
          </span>
          <span className="ms-2 in-review p-2">
            {location.state.package ? " Premium " : "Standard"}
          </span>
        </h1>
      </div>
      <FormGroup row>
        <Col sm={12}>
          <Label>
            Job Title{" "}
            <span className="text-muted">
              <em>( Role / Title of the Job )</em>
            </span>
          </Label>
          <Input {...register("designation")} />
          <small className="text-danger">
            {errors.designation && errors.designation.message}
          </small>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <FormGroup tag="fieldset">
            <label>Job Category</label>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="1" {...register("jobCategory")} />{" "}
                NGO JOB
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="2" {...register("jobCategory")} />{" "}
                CSR JOB
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="3" {...register("jobCategory")} />{" "}
                Government JOB
              </Label>
            </FormGroup>
            <small className="text-danger">
              {errors.jobCategory && errors.jobCategory.message}
            </small>
          </FormGroup>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={12}>
          <FormGroup tag="fieldset">
            <label>Job Type</label>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="1" {...register("jobType")} />{" "}
                Full-Time
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="2" {...register("jobType")} />{" "}
                Part-time
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" value="3" {...register("jobType")} /> Intern
              </Label>
            </FormGroup>
            <small className="text-danger">
              {errors.jobType && errors.jobType.message}
            </small>
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <Label>
            Salary{" "}
            <span className="text-muted">
              <em>( In Month)</em>
            </span>
          </Label>
          <Controller
            control={control}
            name="salaryType"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <>
                <Input
                  type="select"
                  class-name="form-control"
                  onChange={(e) => {
                    onChange(e);
                    setSalaryType(e.target.value);
                  }}
                  onBlur={onBlur}
                >
                  <option value="" label="Choose one option" />
                  <option value="fixed" label="Fixed" />

                  <option value="range" label="Range" />

                  <option value="na" label="Not Disclosed" />
                </Input>
                <small className="text-danger">
                  {errors.salaryType && errors.salaryType.message}
                </small>
              </>
            )}
          />
        </Col>
      </FormGroup>
      {renderSalary(salaryType)}
      <FormGroup row>
        <Col sm={12}>
          <Label>
            Job Description{" "}
            <span className="text-muted">
              <em>( State Roles and Responsibilities )</em>
            </span>
          </Label>
          <Controller
            name="jobDescription"
            control={control}
            rules={{ required: true }}
            className={
              errors.jobDescription ? "form-control is-invalid" : "form-control"
            }
            render={(field) => <MyEditor {...field} errors={errors} />}
          />
          <small className="text-danger">
            {errors.jobDescription && errors.jobDescription.message}
          </small>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <Label>
            Requirements{" "}
            <span className="text-muted">
              <em>
                ( Qualification, Area of Expertise, Skills requirement, etc. )
              </em>
            </span>
          </Label>
          <Controller
            name="requirements"
            rules={{ required: true }}
            control={control}
            render={(field) => <MyEditor {...field} errors={errors} />}
          />
          <small className="text-danger">
            {errors.requirements && errors.requirements.message}
          </small>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={3}>
          <FormGroup>
            <Label>Experience</Label>

            <InputGroup>
              <Input
                type="text"
                placeholder="0"
                {...register("expYears")}
                style={{ width: "10%" }}
              />

              <Input
                type="select"
                {...register("expCategory")}
                className="form-select"
              >
                <option value="" label="Choose One" />
                <option value="Years" label="Years" />
                <option value="Month" label="Month" />
              </Input>
            </InputGroup>
            <small className="text-danger">
              {errors.expYears && errors.expYears.message}
              {errors.expCategory && errors.expCategory.message}
            </small>
          </FormGroup>
        </Col>
        <Col sm={9}>
          <Label>
            Last Date Of Application{" "}
            <span className="text-danger">
              <em>
                ( *Note - The post will be deleted after Last Date of
                Application or if the post expires )
              </em>
            </span>
          </Label>
          <Input
            type="date"
            placeholder="date placeholder"
            {...register("expiryDate")}
          />
          <small className="text-danger">
            {errors.expiryDate && errors.expiryDate.message}
          </small>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={6}>
          <label>External Link</label>
          <Input type="text" {...register("externalLink")} defaultValue="" />
          <small className="text-danger">
            {errors.externalLink && errors.externalLink.message}
          </small>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={6}>
          <label>Organisation Name</label>
          <Input type="text" {...register("orgName")} />
          <small className="text-danger">
            {errors.orgName && errors.orgName.message}
          </small>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={6}>
          <label>
            About Organisation{" "}
            <span className="text-muted">
              <em>( Vision / Mission / Value / Projects /Programme ) </em>
            </span>
          </label>
          <Input type="textarea" {...register("aboutOrg")} />
          <small className="text-danger">
            {errors.aboutOrg && errors.aboutOrg.message}
          </small>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={6}>
          <label>
            Posted By{" "}
            <span className="text-muted">
              <em>( Name of the Contact Person )</em>
            </span>
          </label>
          <Input type="text" {...register("postedBy")} />
          <small className="text-danger">
            {errors.postedBy && errors.postedBy.message}
          </small>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Col sm={4}>
          <label>Office/Workplace Address</label>
          <Input
            type="textarea"
            {...register("orgAddress", { required: "This is Required" })}
          />
          <small className="text-danger">
            {errors.orgAddress && errors.orgAddress.message}
          </small>
        </Col>
        <Col sm={4}>
          <Label>State</Label>

          <Input type="select" onChange={onChangeState} className="form-select">
            {renderStates(props.states)}
          </Input>

          <small className="text-danger">
            {errors.orgState && errors.orgState.message}
          </small>
        </Col>
        <Col sm={4}>
          <label>City</label>
          <Input
            type="select"
            className="form-select"
            {...register("location", { required: "This is Required" })}
          >
            {renderCities(cities)}
          </Input>
          <small className="text-danger">
            {errors.location && errors.location.message}
          </small>
        </Col>
      </FormGroup>

      <FormGroup row className="form-group form-check">
        <Col sm={12}>
          <input
            {...register("terms")}
            className={
              errors.terms ? "form-check-input is-invalid" : "form-check-input"
            }
            type="checkbox"
          ></input>
          <label htmlFor="terms" className="form-check-label">
            I Agree to Glocal Bodh
            <span>
              <a
                href="/rfpPolicy"
                style={{ color: "#0057A8", textDecoration: "none" }}
                target="_blank"
              >
                {" "}
                Posting Policy
              </a>
            </span>
            ,
            <span>
              <a
                href="/terms"
                style={{ color: "#0057A8", textDecoration: "none" }}
                target="_blank"
              >
                Terms of Service
              </a>
            </span>
            {" and "}
            <span>
              <a
                href="/privacyPolicy"
                style={{ color: "#0057A8", textDecoration: "none" }}
                target="_blank"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          <small className="text-danger">
            {errors.terms && errors.terms.message}
          </small>
        </Col>
      </FormGroup>

      <FormGroup className="text-center">
        {" "}
        <Button className="mt-3 btn-lg" color="primary">
          Submit
        </Button>
      </FormGroup>
    </Form>
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

export default connect(mapStateToProps)(CreateJobPost);
