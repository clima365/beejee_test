import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import styled from "styled-components";
import { Formik, Field, Form, ErrorMessage } from "formik";

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

class EditForm extends Component {
  state = {};

  render() {
    const { id, text, handleEdit, onClose, isOpen } = this.props;
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}>
        <Container>
          <Header>Edit todo</Header>
          <Formik
            initialValues={{ text }}
            validate={values => {
              let errors = {};

              if (!values.text) {
                errors.text = "Text is required";
              }

              return errors;
            }}
            onSubmit={(values, actions) => {
              const variables = {
                id,
                text: values.text
              };
              handleEdit(variables);
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <StyledForm>
                <Field
                  name="text"
                  render={({ field }) => (
                    <input {...field} placeholder="Text" />
                  )}
                />
                <button type="submit" disabled={isSubmitting}>
                  Edit
                </button>
                <button onClick={onClose}>Cancel</button>
                {errors &&
                  Object.keys(errors).map((item, i) => {
                    return <Error key={i}>{errors[item]}</Error>;
                  })}
              </StyledForm>
            )}
          />
        </Container>
      </Modal>
    );
  }
}

export default EditForm;
