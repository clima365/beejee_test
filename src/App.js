import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { getList } from "./actions";
import { AddTodoForm, TodoList, LoginForm } from "./components";

const Container = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const Header = styled.div`
  height: 64px;
  padding: 0 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;

  button {
    height: 32px;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const ButtonsContainer = styled.div`
  width: 700px;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 24px;
`;

class App extends Component {
  state = {
    mode: "list",
    isAdmin: false
  };

  componentDidMount() {
    this.props.getList({ page: 1 });
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin) {
      this.setState({
        isAdmin: true
      });
    }
  }

  handleNextPage = () => {
    const currentPage = this.props.page;
    this.props.getList({ page: currentPage + 1 });
  };

  handlePreviousPage = () => {
    const currentPage = this.props.page;
    this.props.getList({ page: currentPage - 1 });
  };

  handleChangeMode = mode => {
    this.setState({
      mode
    });

    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin) {
      this.setState({
        isAdmin: true
      });
    }

    if (mode === "list") {
      this.props.getList({ page: 1 });
    }
  };

  handleLogout = () => {
    localStorage.removeItem("isAdmin");
    this.setState({
      isAdmin: false
    });
  };

  render() {
    const { mode, isAdmin } = this.state;
    const { todos, page, pagesCount, getList, sortFilter } = this.props;
    return (
      <Container>
        <Header>
          <button onClick={() => this.handleChangeMode("addTodo")}>
            Add todo
          </button>
          <Title>Todo App</Title>
          {isAdmin === false && (
            <button onClick={() => this.handleChangeMode("login")}>
              login
            </button>
          )}
          {isAdmin === true && (
            <button onClick={this.handleLogout}>logout</button>
          )}
        </Header>
        <Content>
          {mode === "list" && (
            <TodoList
              todos={todos}
              isAdmin={isAdmin}
              getList={getList}
              sortFilter={sortFilter}
            />
          )}
          {mode === "list" && (
            <ButtonsContainer>
              {page > 1 && (
                <button onClick={this.handlePreviousPage}>Prev page</button>
              )}
              {page < pagesCount && (
                <button onClick={this.handleNextPage}>Next page</button>
              )}
            </ButtonsContainer>
          )}
          {mode === "addTodo" && (
            <AddTodoForm onCancel={() => this.handleChangeMode("list")} />
          )}
          {mode === "login" && (
            <LoginForm onCancel={() => this.handleChangeMode("list")} />
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  page: state.page,
  sortFilter: state.sortFilter,
  pagesCount: state.pagesCount
});

const mapDispatchToProps = dispatch => ({
  getList: page => dispatch(getList(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
