import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import TodoItem from "./TodoItem";
import styled from "styled-components";

function writeTodosToLocalStorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

const Container = styled.div``;

const Title = styled.h1`
  text-align: center;
`;

const Todo = styled.div`
  text-align: center;
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
    border: 2px solid blue;
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
    border: 2px solid red;
  }
`;

// 放在外面是為了避免重複計算，定義 filter
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.isDone,
  Completed: (todo) => todo.isDone,
};
// 將 FILTER_MAP 的 keys 收集成陣列
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem("todos") || "";
    if (todoData && todoData !== "[]") {
      todoData = JSON.parse(todoData);
      id.current = todoData[0].id + 1;
    } else {
      todoData = [];
    }
    return todoData;
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("All");

  const FilterButton = (props) => {
    return (
      <Button
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        <span>{props.name}</span>
      </Button>
    );
  };

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  useLayoutEffect(() => {
    const todoData = window.localStorage.getItem("todos") || "";
    if (todoData) {
      setTodos(JSON.parse(todoData));
    }
  }, []);

  useEffect(() => {
    writeTodosToLocalStorage(todos);
    console.log("useEffect: todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleButtonClick = useCallback(() => {
    if (value === "") {
      alert("不可空白");
      return;
    }
    setTodos([
      {
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todos,
    ]);
    setValue("");
    id.current++;
  }, [setValue, setTodos, value, todos]);

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearClick = () => {
    setTodos([]);
  };
  return (
    <Container>
      <Title>我的第一個 ToDoList</Title>
      <Todo>
        <input
          type="text"
          placeholder="請輸入待辦事項"
          onChange={handleInputChange}
          value={value}
        />
        <button onClick={handleButtonClick}>送出</button>
      </Todo>

      <Buttons>
        {filterList}
        <ClearButton onClick={handleClearClick}>ClearAll</ClearButton>
      </Buttons>
      {todos.filter(FILTER_MAP[filter]).map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </Container>
  );
}
