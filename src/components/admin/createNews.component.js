import React from "react";
import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchemaNews } from "../../constants/schema";

import { clearLoader, setLoader } from "../../store/actions/loader";
import AdminService from "../../services/admin.service";
import { alert } from "../../helpers/alerts";
import MyEditor from "../../helpers/editor";
const CreateNews = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchemaNews) });

  const onSubmit = (values) => {
    props.dispatch(setLoader());
    const data = {
      title: values.newsTitle,
      description: values.newsDescription,
      newsLink: values.newsLink,
      newsDate: new Date(values.newsDate).getTime(),
    };
    AdminService.createNews(data)
      .then((res) => {
        props.dispatch(clearLoader());
        if (res.data.status === 1) {
          alert("success", "Successfully Created");
        } else {
          alert("error", res.data.message);
        }
      })
      .catch((res) => {
        alert("error", res.data.message);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mx-auto'>
        <h1>Create News</h1>
      </div>
      <div className='form-group'>
        <label htmlFor='newsTitle'>News Title</label>
        <input
          className={
            errors.newsTitle ? "form-control is-invalid" : "form-control"
          }
          type='text'
          {...register("newsTitle")}
        />
        {errors.newsTitle && errors.newsTitle.message ? (
          <div className='invalid-feedback'>{errors.newsTitle.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='newsDescription'>News Description</label>
        <Controller
          name='newsDescription'
          control={control}
          rules={{ required: true }}
          className={
            errors.newsDescription ? "form-control is-invalid" : "form-control"
          }
          render={(field) => <MyEditor {...field} errors={errors} />}
        />
        <small className='text-danger'>
          {errors.newsDescription && errors.newsDescription.message}
        </small>
      </div>

      <div className='form-group'>
        <label htmlFor='newsLink'>News Link</label>
        <input
          {...register("newsLink")}
          className={
            errors.newsLink ? "form-control is-invalid" : "form-control"
          }
        />
        {errors.newsLink && errors.newsLink.message ? (
          <div className='invalid-feedback'>{errors.newsLink.message}</div>
        ) : null}
      </div>

      <div className='form-group'>
        <label htmlFor='newsDate'>Date</label>
        <input
          {...register("newsDate")}
          className={
            errors.newsDate ? "form-control is-invalid" : "form-control"
          }
          type='date'
        />
        {errors.newsDate && errors.newsDate.message ? (
          <div className='invalid-feedback'>{errors.newsDate.message}</div>
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

export default connect(mapStateToProps)(CreateNews);
