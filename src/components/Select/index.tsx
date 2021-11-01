import React, { useState, SelectHTMLAttributes } from 'react';

import { Container } from './styles';

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
    </Container>
  );
};
export default Select;
