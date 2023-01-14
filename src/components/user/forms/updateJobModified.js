import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader, clearLoader } from "../../../store/actions/loader";
import UserService from "../../../services/user.service";
import { alertCustom } from "../../../helpers/alerts";
import {
  Input,
  Form,
  CustomControllerRadio,
} from "../../../components/auth/inputs";

import "bootstrap/dist/css/bootstrap.min.css";

import { connect } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaJob } from "../../../constants/schema";

import {
  renderCities,
  renderStates,
  onChangeStates,
} from "../../../services/render-services";

import MyEditor from "../../../helpers/editor";

const UpdateJobPost = (props) => {
  const [cities, getCities] = useState([]);
  const [salaryType, setSalaryType] = useState("");
  const [job, setJob] = useState({});
  const dispatch = useDispatch();
  let { jobId } = useLocation();

  useEffect(() => {
    dispatch(setLoader());
    UserService.getJobDetails(jobId).then((res) => {
      dispatch(clearLoader());
      setJob(res.data.jobDetailsBean);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (job) {
  //     reset({
  //       designation: job.designation,
  //     });
  //   }
  // }, [job]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values) => {
    console.log(values);
    // props.dispatch(setLoader());
    // let minSal, maxSal;
    // if (salaryType === "fixed") {
    //   maxSal = minSal = values.fixedSalary;
    // }
    // if (salaryType === "range") {
    //   minSal = values.minSalary;
    //   maxSal = values.maxSalary;
    // }
    // if (salaryType === "na") {
    //   minSal = maxSal = 0;
    // }
    // const a = `<h3 style="color: #000000;">About Us</h3>\r\n${values.aboutOrg}\r\n<h3 style="color: #000000;">Work Place Loaction</h3>\r\n${values.orgAddress}`;
    // const b = `${values.aboutOrg}\r\n<h3 style="color: #000000;">Responsibilities</h3>\r\n${values.jobDescription}`;
    // const c = `\r\n<li>Minimum ${values.expYears} ${values.expCategory} of experiance</li>\r\n${values.requirements}`;

    // const data = {
    //   jobId: jobId,
    //   jobDataBean: {
    //     jobDetailsBean: {
    //       designation: values.designation,
    //       companyName: values.orgName,
    //       companyLogo: "",
    //       minSalary: minSal,
    //       maxSalary: maxSal,
    //       location: values.location,
    //       jobDescription: b,
    //       companyDetails: a,
    //       requirement: c,
    //       postedBy: values.postedBy,
    //     },
    //     jobType: values.jobType,
    //     expiryDate: new Date(values.expiryDate).getTime(),
    //   },
    // };
    // UserService.updateJob(data).then((res) => {
    //   props.dispatch(clearLoader());
    //   if (res.data.status === 1) {
    //     alertCustom("success", "Successfully Created", "/user/myJobs");
    //   } else {
    //     alertCustom("error", res.data.message, "/user/myJobs");
    //   }
    // });
  };

  // const renderSalary = (value) => {
  //   switch (value) {
  //     case "fixed":
  //       return (
  //         <FormGroup row className='mt-2'>
  //           <Col sm={6}>
  //             <Input
  //               type='text'
  //               placeholder='Enter Fixed Salary'
  //               {...register("fixedSalary")}
  //             />
  //             <small className='text-danger'>
  //               {errors.fixedSalary && errors.fixedSalary.message}
  //             </small>
  //           </Col>
  //         </FormGroup>
  //       );
  //     case "range":
  //       return (
  //         <FormGroup row className='mt-2'>
  //           <Col sm={3}>
  //             <Input
  //               type='text'
  //               placeholder='Enter Minimum Salary'
  //               {...register("minSalary")}
  //             />
  //             <small className='text-danger'>
  //               {errors.minSalary && errors.minSalary.message}
  //             </small>
  //           </Col>
  //           <Col sm={1}>
  //             <h6>To</h6>
  //           </Col>
  //           <Col sm={3}>
  //             <Input
  //               type='text'
  //               placeholder='Enter Maximum Salary'
  //               {...register("maxSalary")}
  //             />
  //             <small className='text-danger'>
  //               {errors.maxSalary && errors.maxSalary.message}
  //             </small>
  //           </Col>
  //         </FormGroup>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // const onChangeState = (e) => {
  //   onChangeStates(e.target.value).then((res) => {
  //     getCities(res.data);
  //   });
  // };

  return (
    <div>
      {job && (
        <Form onSubmit={onSubmit} schema={validationSchemaJob}>
          <Input
            name='designation'
            type='text'
            label='Job Title'
            defaultValue={job.designation}
          />

          <CustomControllerRadio
            name='jobType'
            label='Job Type'
            labels={["Full Time", "Part Time", "Intern"]}
            values={["1", "2", "3"]}
            defaultValue={job.jobType === "Full Time" ? true : false}
          />
        </Form>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  const { isLoading } = state.loader;
  const { states } = state.states;
  const { user } = state.auth;

  return {
    isLoading,
    states,
    user,
  };
}

export default connect(mapStateToProps)(UpdateJobPost);
