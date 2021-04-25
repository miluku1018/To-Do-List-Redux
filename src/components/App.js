import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos, selectFilter } from "../redux/selectors";
import {
  addTodo,
  clearTodo,
  setFilter,
  getTodosFromLocalStorage,
} from "../redux/actions";

const Container = styled.div`
  background-color: lightpink;
  width: 600px;
  margin: 0 auto;
  padding: 10px 20px 20px;
  border-radius: 3px;
  box-shadow: 3px 3px lightgrey;
`;

const Title = styled.h1`
  text-align: center;
`;

const Todo = styled.div`
  text-align: center;
`;

const Input = styled.input`
  width: 200px;
  border: 1px solid lightgrey;
  height: 25px;
  border-radius: 3px;
`;

const InputButton = styled.button`
  height: 28px;
  width: 60px;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: #ffffff;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Button = styled.button`
  width: 80px;
  height: 30px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 3px;
  border: 1px solid #84828254;

  & + & {
    margin-left: 4px;
  }
  &:hover {
    background-color: #00fffd;
    border: 1px solid transparent;
  }
`;

const ClearButton = styled.button`
  width: 80px;
  height: 30px;
  cursor: pointer;
  background: #ffffff;
  border-radius: 3px;
  border: 1px solid #84828254;
  margin-left: 4px;
  &:hover {
    background-color: #ee6854;
    border: 1px solid transparent;
  }
`;

export default function App() {
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {
      dispatch(getTodosFromLocalStorage(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch(addTodo(value));
    setValue("");
  };

  const handleClearClick = () => {
    dispatch(clearTodo());
  };

  const handleFilter = (filter) => () => {
    dispatch(setFilter(filter));
  };

  return (
    <Container>
      <Title> Miao's ToDoList</Title>
      <Todo>
        <Input
          type="text"
          placeholder="請輸入待辦事項"
          onChange={handleInputChange}
          value={value}
        />
        <InputButton onClick={handleButtonClick}>送出</InputButton>
      </Todo>
      <Buttons>
        <Button onClick={handleFilter("all")}>All</Button>
        <Button onClick={handleFilter("active")}>Active</Button>
        <Button onClick={handleFilter("completed")}>Completed</Button>
        <ClearButton onClick={handleClearClick}>Clear</ClearButton>
      </Buttons>
      <div>
        {todos
          .filter((todo) => {
            switch (filter) {
              case "all":
                return true;
              case "completed":
                return todo.completed;
              case "active":
                return !todo.completed;
              default:
                return true;
            }
          })
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
      </div>
    </Container>
  );
}
