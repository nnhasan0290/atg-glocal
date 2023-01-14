import React from "react";

import { Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormContext, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import MyEditor from "../helpers/editor";
import "../../node_modules/font-awesome/css/font-awesome.css";
import "../App.scss";

// function IsolateReRender({ control, name }) {
//   const value = useWatch({
//     control,
//     name: name, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
//     defaultValue: "", // default value before the render
//   });

//   return <div>{value}</div>; // only re-render at the component level, when firstName changes
// }

export const CustomForm = ({ children, onSubmit }) => {
  const methods = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        if (child !== null) {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  register: register,
                  errors: errors,
                  control: control,
                  key: child.props.name,
                },
              })
            : child;
        }
      })}
    </form>
  );
};
export const Form = ({ children, onSubmit, schema }) => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors: errors,
                control: control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
};
export const Input = ({
  register,
  type,
  errors,
  name,
  label,
  defaultValue,
  ...rest
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
      <input
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        type={type}
        defaultValue={defaultValue}
        {...register(name)}
        {...rest}
      />
      {errors[name] && errors[name].message ? (
        <span className='invalid-feedback'>{errors[name].message}</span>
      ) : null}
    </div>
  );
};
export const Button = ({ name, isLoading }) => {
  return (
    <div className='form-group d-flex justify-content-center '>
      <button
        type='submit'
        className='btn btn-primary btn-block mt-3 w-100 p-2'
        style={{ backgroundColor: "#0057A8" }}
        disabled={isLoading}
      >
        {isLoading && (
          <span className='spinner-border spinner-border-sm '></span>
        )}
        <span>{name}</span>
      </button>
    </div>
  );
};
export function Select({ register, options, name, ...rest }) {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
export const TextArea = ({ register, errors, name, label, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
      <textarea
        className={errors[name] ? "form-control is-invalid" : "form-control"}
        {...register(name)}
        {...rest}
      />
      {errors[name] && errors[name].message ? (
        <span className='invalid-feedback'>{errors[name].message}</span>
      ) : null}
    </div>
  );
};

export function CustomController({ name, errors, control, label }) {
  console.log(errors);
  return (
    <div className='form-group'>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={(field) => <MyEditor {...field} errors={errors} />}
      />
      {errors[name] && errors[name].message ? (
        <span className='text-danger'>{errors[name].message}</span>
      ) : null}
    </div>
  );
}

export function Radio({ name, labels, register, values, errors }) {
  return (
    <div>
      {values.map((value, index) => {
        return (
          <div className='form-check form-check-inline' key={index}>
            <label className='form-check-label' htmlFor={labels[index]}>
              <input
                className={
                  errors[name]
                    ? "form-check-input is-invalid"
                    : "form-check-input"
                }
                type='radio'
                {...register(name)}
                value={value}
              />
              {labels[index]}
            </label>
          </div>
        );
      })}
      {errors[name] && errors[name].message ? (
        <span className='invalid-feedback'>{errors[name].message}</span>
      ) : null}
    </div>
  );
}

export function Label({ label }) {
  return <label>{label}</label>;
}
export const InputGroup = ({
  register,
  type,
  errors,
  name,
  icon,
  placeholder,
  ...rest
}) => {
  return (
    <div className='form-group input-box mt-3'>
      <i className={icon}></i>
      <input
        className={
          errors[name]
            ? "form-control is-invalid border-right-0"
            : "form-control border-right-0"
        }
        placeholder={placeholder}
        type={type}
        {...register(name)}
        {...rest}
      />
      {errors[name] && errors[name].message ? (
        <span className='invalid-feedback'>{errors[name].message}</span>
      ) : null}
    </div>
  );
};

export function CustomControllerRadio({
  name,
  errors,
  control,
  labels,
  values,
  label,
  watch,
  defaultValue,
}) {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur } }) => {
          return values.map((value, index) => (
            <div className='form-check form-check-inline' key={index}>
              <label className='form-check-label' htmlFor={labels[index]}>
                <input
                  className={
                    errors[name]
                      ? "form-check-input is-invalid"
                      : "form-check-input"
                  }
                  type='radio'
                  value={value}
                  onChange={(e) => onChange(e)}
                  onBlur={(e) => onBlur(e)}
                  name={name}
                />
                {labels[index]}
              </label>
            </div>
          ));
        }}
      />

      {errors[name] && errors[name].message ? (
        <span className='text-danger'>{errors[name].message}</span>
      ) : null}
    </div>
  );
}
