import React, { Component } from "react";
import { connect } from "react-redux";
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

const AddTodoForm = props => {
  const { onCancel, addTodo } = props;
  return (
    <Container>
      <Header>Add todo</Header>
      <Formik
        validate={values => {
          let errors = {};

          if (!values.email) {
            errors.email = "Email is required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.text) {
            errors.text = "Text is required";
          }

          if (!values.name) {
            errors.name = "Name is required";
          }

          return errors;
        }}
        onSubmit={(values, actions) => {
          const variables = {
            email: values.email,
            username: values.name,
            text: values.text
          };
          addTodo(variables);
          onCancel();
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <StyledForm>
            <Field
              name="email"
              render={({ field }) => <input {...field} placeholder="Email" />}
            />
            <Field
              name="name"
              render={({ field }) => <input {...field} placeholder="Name" />}
            />
            <Field
              name="text"
              render={({ field }) => <input {...field} placeholder="Text" />}
            />
            <button type="submit" disabled={isSubmitting}>
              Add todo
            </button>
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

const mapDispatchToProps = dispatch => ({
  addTodo: variables => dispatch(addTodo(variables))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTodoForm);
