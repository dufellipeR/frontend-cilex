import React, { TableHTMLAttributes, useMemo, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Table, TableHead } from './styles';

type TableProps = TableHTMLAttributes<HTMLTableElement> & {
  tbh: string[] | null;
};

const DefaultTable: React.FC<TableProps> = ({ children, tbh, ...rest }) => {
  const [visualize, setVisualize] = useState(true);

  return (
    <Table>
      <thead>
        <TableHead>
          {tbh && tbh.map((item) => <th key={item}>{item}</th>)}
        </TableHead>
      </thead>
      {children}
    </Table>
  );
};

export default DefaultTable;
