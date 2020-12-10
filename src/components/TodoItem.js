import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../redux/actions";

const TodoItemWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 3px;
  background: #ffffff63;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoContent = styled.div`
  margin: 5px;
`;

const TodoButtonWrapper = styled.div`
  display: flex;
`;

const BlueButton = styled.button`
  &:hover {
    color: #ffffff;
    background: green;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  margin: 0 3px;
  cursor: pointer;
`;

const RedButton = styled.button`
  &:hover {
    color: #ffffff;
    background: red;
    border: 1px solid transparent;
    border-radius: 3px;
  }
  margin: 0 3px;
  cursor: pointer;
`;

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <TodoItemWrapper>
      <TodoContent completed={todo.completed}>{todo.name}</TodoContent>
      <TodoButtonWrapper>
        <BlueButton onClick={() => dispatch(toggleTodo(todo.id))}>
          {todo.completed ? "未完成" : "已完成"}
        </BlueButton>
        <RedButton onClick={() => dispatch(deleteTodo(todo.id))}>
          刪除
        </RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
