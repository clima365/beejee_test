import React, { Component } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { connect } from "react-redux";
import { EditForm } from "./";
import { editTodo } from "../actions";

const Container = styled.div`
  width: 700px;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledTh = styled.th`
  cursor: pointer;

  background-color: ${props => (props.active ? "red" : "transparent")};
`;

class TodoList extends Component {
  state = {
    isEditModalOpen: null
  };

  handleToggleEditModal = id => {
    this.setState({
      isEditModalOpen: id
    });
  };

  handleCloseEditModal = () => {
    this.setState({
      isEditModalOpen: null
    });
  };

  handleEditTodo = ({ id, status, text }) => {
    const { editTodo } = this.props;
    const variables = { id, text };
    if (typeof status === "number") {
      variables.status = status === 0 ? 10 : 0;
    }
    editTodo(variables);
    this.handleCloseEditModal();
  };

  render() {
    const { todos, isAdmin, getList, sortFilter } = this.props;
    const { isEditModalOpen } = this.state;
    return (
      <Container>
        <table border="1" width="100%">
          <thead>
            <tr>
              <StyledTh
                onClick={() => getList({ sortFilter: "username" })}
                active={sortFilter === "username" ? true : false}
              >
                Name
              </StyledTh>
              <StyledTh
                onClick={() => getList({ sortFilter: "email" })}
                active={sortFilter === "email" ? true : false}
              >
                Email
              </StyledTh>
              <th>Text</th>
              <StyledTh
                onClick={() => getList({ sortFilter: "status" })}
                active={sortFilter === "status" ? true : false}
              >
                Status
              </StyledTh>
            </tr>
          </thead>
          <tbody>
            {todos.map((item, i) => (
              <tr key={i}>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.text}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.status === 0 ? false : true}
                    onClick={() =>
                      this.handleEditTodo({ id: item.id, status: item.status })
                    }
                    disabled={isAdmin ? false : true}
                  />
                  {isAdmin && (
                    <button onClick={() => this.handleToggleEditModal(item.id)}>
                      Edit
                    </button>
                  )}
                  <EditForm
                    id={item.id}
                    text={item.text}
                    handleEdit={this.handleEditTodo}
                    onClose={this.handleCloseEditModal}
                    isOpen={isEditModalOpen === item.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editTodo: variables => dispatch(editTodo(variables))
});

export default connect(
  null,
  mapDispatchToProps
)(TodoList);
