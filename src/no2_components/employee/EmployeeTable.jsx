import React from 'react';
import styled from 'styled-components';

import { useGetEmployee } from '../../no3_store/hooks/useEmployee';

const EmployeeTable = ({ selectedId }) => {
  const {
    data: emp,
    isPending,
    error
  } = useGetEmployee(selectedId);

  if (!selectedId) {
    return <Message>직원을 선택하세요.</Message>;
  }

  if (isPending) {
    return <Message>불러오는 중...</Message>;
  }

  if (error) {
    return <Message>직원 정보를 불러오지 못했습니다.</Message>;
  }

  return (
    <Table>
      <tbody>
        {Object.entries(emp).map(([key, value]) => (
          <tr key={key}>
            <Th>{key}</Th>
            <Td>{value}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;


const Message = styled.p`
  color: #64748b;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  width: 140px;
  background: #e2e8f0;
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #cbd5e1;
`;

const Td = styled.td`
  padding: 14px;
  border-bottom: 1px solid #e2e8f0;
`;