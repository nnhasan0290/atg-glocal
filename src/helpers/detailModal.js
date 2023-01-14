import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import parse from "html-react-parser";
import { connect } from "react-redux";

import { CustomForm, Radio, Label, TextArea } from "../utils/inputs";
import { validationSchemaReviewJob } from "../constants/schema";
import AdminService from "../services/admin.service";
import { alert, alertCustom } from "./alerts";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const JobDetailModal = (props) => {
  const methods = useForm({ resolver: yupResolver(validationSchemaReviewJob) });

  const { data } = props;

  const { watch } = methods;
  const status = watch("approve", "");

  let jobStatus;
  const onSubmit = (values) => {
    values.jobStatus = jobStatus;
    values.jobId = data.jobId;
    values.jobStatus = 2;

    if (status === "disapprove") {
      values.applicantLink = "";
      values.employerLink = "";
      values.jobStatus = 3;
    }

    AdminService.reviewJob(values)
      .then((res) => {
        if (res.data.status === 1) {
          alert("success", "Job is Successfully Reviewed");
        } else {
          alert("error", res.data.message);
        }
      })
      .catch((err) => {
        alertCustom("error", err.message, "/home");
      });
  };

  return (
    <Modal
      show={props.show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Job Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {parse(data.requirement)}
        {parse(data.companyDetails)}
        {parse(data.jobDescription)}
        {props.user.admin && data.jobStatus === 1 && (
          <FormProvider {...methods}>
            <CustomForm onSubmit={onSubmit}>
              <Label label='Actions' />
              <Radio
                name='approve'
                values={["approve", "disapprove"]}
                labels={["Approve", "Disapprove"]}
              />

              {status === "disapprove" && (
                <TextArea name='reasonText' label='Reasons' />
              )}
              <button className='btn btn-primary mt-2'>Submit</button>
            </CustomForm>
          </FormProvider>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={props.onHide}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

function matchStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(matchStateToProps)(JobDetailModal);
