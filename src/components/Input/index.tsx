import React, { InputHTMLAttributes, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  messageError?: string;
}

const Input: React.FC<InputProps> = ({ icon: Icon, messageError, ...rest }) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <Container isFocus={inputFocus} isError={!!messageError}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        {...rest}
      />

      {messageError && (
        <Error title={messageError}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
