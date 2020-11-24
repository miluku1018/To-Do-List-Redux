import styled from "styled-components";

const TodoItemWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 3px;
  border: 1px solid rgba(54, 84, 7, 0.5);
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

export default function TodoItem({ todo, handleToggleTodo, handleDeleteTodo }) {
  const handleToggleClick = () => {
    handleToggleTodo(todo.id);
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <TodoItemWrapper data-todo-id={todo.id}>
      <TodoContent>{todo.content}</TodoContent>
      <TodoButtonWrapper>
        <BlueButton onClick={handleToggleClick}>
          {todo.isDone ? "未完成" : "已完成"}
        </BlueButton>
        <RedButton onClick={handleDeleteClick}>刪除</RedButton>
      </TodoButtonWrapper>
    </TodoItemWrapper>
  );
}
