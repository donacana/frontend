import React, { useEffect, useState } from 'react';
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline
} from 'react-icons/md';
import styled from 'styled-components';

import {
  usePutTodo,
  useDeleteTodo
} from '../../no3_store/hooks/useTodo';

const TodoListChild = ({ item }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.subject);

  const putMutation = usePutTodo();
  const deleteMutation = useDeleteTodo();

  useEffect(() => {
    setValue(item.subject);
  }, [item.subject]);

  // 내용 수정
  const handleUpdate = async () => {
    if (!value.trim()) {
      setValue(item.subject);
      setEditing(false);
      return;
    }

    if (value === item.subject) {
      setEditing(false);
      return;
    }

    try {
      await putMutation.mutateAsync({
        ...item,
        subject: value
      });

      setEditing(false);
    } catch (error) {
      alert('할 일 수정 실패');
      setValue(item.subject);
    }
  };

  // 체크 상태 수정
  const handleToggle = async () => {
    try {
      await putMutation.mutateAsync({
        ...item,
        checked: !item.checked
      });
    } catch (error) {
      alert('체크 상태 변경 실패');
    }
  };

  // 삭제
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(item.id);
    } catch (error) {
      alert('할 일 삭제 실패');
    }
  };

  return (
    <Container>
      <CheckBoxArea onClick={handleToggle}>
        {item.checked
          ? <MdCheckBox />
          : <MdCheckBoxOutlineBlank />
        }
      </CheckBoxArea>

      <ContentArea>
        {editing ? (
          <EditInput
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.target.blur();
              }
            }}
            autoFocus
          />
        ) : (
          <Checked
            $checked={item.checked}
            onDoubleClick={() => setEditing(true)}
          >
            {item.subject}
          </Checked>
        )}
      </ContentArea>

      <DeleteButton onClick={handleDelete}>
        <MdRemoveCircleOutline />
      </DeleteButton>
    </Container>
  );
};

export default TodoListChild;


const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CheckBoxArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #3b82f6;
  cursor: pointer;
`;

const ContentArea = styled.div`
  flex: 1;
`;

const Checked = styled.div`
  font-size: 18px;

  color: ${({ $checked }) =>
    $checked ? '#999' : '#222'};

  text-decoration: ${({ $checked }) =>
    $checked ? 'line-through' : 'none'};

  transition: 0.2s;
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ef4444;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;