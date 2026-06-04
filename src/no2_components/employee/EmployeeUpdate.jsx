import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  useGetEmployee,
  usePutUpdateEmployee
} from '../../no3_store/hooks/useEmployee';

const initialEmp = {
  id: '',
  name: '',
  email: '',
  job: '',
  pay: ''
};

const EmployeeUpdate = ({ selectedId, setMode }) => {
  const [newEmp, setNewEmp] = useState(initialEmp);

  const {
    data: emp,
    isPending: isEmployeePending
  } = useGetEmployee(selectedId);

  const updateMutation = usePutUpdateEmployee();

  useEffect(() => {
    if (emp) {
      setNewEmp(emp);
    }
  }, [emp]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewEmp((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateMutation.mutateAsync({
        ...newEmp,
        pay: Number(newEmp.pay)
      });

      alert('직원 수정 완료');
      setMode('');
    } catch (error) {
      alert('직원 수정 실패');
    }
  };

  if (isEmployeePending) {
    return <p>직원 정보를 불러오는 중...</p>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label>이름</Label>
        <Input
          type="text"
          name="name"
          value={newEmp.name}
          onChange={handleChange}
          placeholder="이름"
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>이메일</Label>
        <Input
          type="email"
          name="email"
          value={newEmp.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>직업</Label>
        <Input
          type="text"
          name="job"
          value={newEmp.job}
          onChange={handleChange}
          placeholder="직업"
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>급여</Label>
        <Input
          type="number"
          name="pay"
          value={newEmp.pay}
          onChange={handleChange}
          placeholder="급여"
          required
        />
      </InputGroup>

      <SubmitButton disabled={updateMutation.isPending}>
        {updateMutation.isPending ? '수정 중...' : '수정'}
      </SubmitButton>
    </Form>
  );
};

export default EmployeeUpdate;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #334155;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  outline: none;
  font-size: 15px;

  &:focus {
    border-color: #3b82f6;
  }
`;

const SubmitButton = styled.button`
  border: none;
  background: #f59e0b;
  color: white;
  padding: 14px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;