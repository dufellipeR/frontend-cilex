import React from 'react';
import { MdClose } from 'react-icons/md';

import Button from '../Button';

import { theme } from '../../App';
import { Background, Content } from './styles';

interface ModalDeleteProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  widthRem?: number;
  heightRem?: number;
  actionToDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  visible,
  setVisible,
  widthRem,
  heightRem,
  actionToDelete,
}) => {
  return visible ? (
    <Background>
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
        <h3>Realmente deseja excluir essa informação ?</h3>

        <Button layoutColor="button-filled" onClick={actionToDelete}>
          Excluir
        </Button>
      </Content>
    </Background>
  ) : null;
};

export default ModalDelete;
