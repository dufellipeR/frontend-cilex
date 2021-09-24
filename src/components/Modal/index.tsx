import React from 'react';
import { MdClose } from 'react-icons/md';

import { theme } from '../../App';
import { Background, Content } from './styles';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  widthRem?: number;
  heightRem?: number;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  setVisible,
  widthRem = 0,
  heightRem = 0,
  children,
}) => {
  return visible ? (
    <Background>
      {widthRem && heightRem ? (
        <Content widthRem={widthRem} heightRem={heightRem}>
          <button
            type="button"
            id="button-exit"
            onClick={() => {
              setVisible(false);
            }}
          >
            <MdClose size={20} color={theme.main} />
          </button>
          {children}
        </Content>
      ) : (
        <Content>
          <button
            type="button"
            id="button-exit"
            onClick={() => {
              setVisible(false);
            }}
          >
            <MdClose size={20} color={theme.main} />
          </button>
          {children}
        </Content>
      )}
    </Background>
  ) : null;
};

export default Modal;
