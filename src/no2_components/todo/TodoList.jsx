import React from 'react';
import styled from 'styled-components';

import TodoListChild from './TodoListChild';
import { useAllGetTodo } from '../../no3_store/hooks/useTodo';

const TodoList = () => {
  const {
    data: todoList = [],
    isPending,
    error
  } = useAllGetTodo();

  if (isPending) {
    return <Message>로딩 중...</Message>;
  }

  if (error) {
    return <Message>할 일 목록을 불러오지 못했습니다.</Message>;
  }

  if (todoList.length === 0) {
    return <Message>등록된 할 일이 없습니다.</Message>;
  }

  return (
    <Container>
      {todoList.map((item) => (
        <TodoListChild
          key={item.id}
          item={item}
        />
      ))}
    </Container>
  );
};

export default TodoList;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Message = styled.p`
  text-align: center;
  color: #64748b;
`;