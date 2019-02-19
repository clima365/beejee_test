import React, { Component } from "react";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { addTodo } from "../actions";

const Container = styled.div``;

const Header = styled.h3`
  text-align: center;
`;

const StyledForm = styled(Form)`
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Error = styled.h6`
  text-align: center;
  color: red;
`;

const LoginForm = props => {
  const { onCancel } = props;
  return (
    <Container>
      <Header>Login</Header>
      <Formik
        validate={values => {
          let errors = {};

          if (!values.login) {
            errors.password = "Login is required";
          }

          if (!values.password) {
            errors.password = "password is required";
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          const { login, password } = values;
          if (login !== "admin") {
            alert("No such user");
          } else if (password !== "123") {
            alert("Password is wrong");
          } else {
            localStorage.setItem("isAdmin", "true");
            onCancel();
          }
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <StyledForm>
            <Field
              name="login"
              render={({ field }) => <input {...field} placeholder="Login" />}
            />
            <Field
              name="password"
              render={({ field }) => (
                <input type="password" {...field} placeholder="Password" />
              )}
            />
            <button type="submit">Login</button>
            <button onClick={onCancel}>Cancel</button>
            {errors &&
              Object.keys(errors).map((item, i) => {
                return <Error key={i}>{errors[item]}</Error>;
              })}
          </StyledForm>
        )}
      />
    </Container>
  );
};

export default LoginForm;
