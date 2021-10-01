import React, { useState, SelectHTMLAttributes } from 'react';

import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  messageError?: string;
}

const Select: React.FC<SelectProps> = ({ messageError, children, ...rest }) => {
  const [selectFocus, setSelectFocus] = useState(false);

  return (
    <Container
      onFocus={() => setSelectFocus(true)}
      onBlur={() => setSelectFocus(false)}
      isFocus={selectFocus}
      isError={!!messageError}
      {...rest}
    >
      {children}

      {/* {messageError && (
        <Error title={messageError}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )} */}
    </Container>
  );
};
export default Select;
