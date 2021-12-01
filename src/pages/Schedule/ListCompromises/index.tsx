import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import CompromiseRow from '../CompromiseRow';

import { Container } from './styles';

interface Compromise {
  id: number;
  day: string;
  hour: string;
  service: {
    title: string;
    color: string;
  };
  pet: {
    name: string;
    owner: {
      name: string;
      address: string;
    };
  };
}

interface ListCompromisesProps {
  dayClicked: string;
  compromises: Compromise[];
}

const ListCompromises: React.FC<ListCompromisesProps> = ({
  dayClicked,
  compromises,
}) => {
  const { colors } = useContext(ThemeContext);
  const [showDetailCompromise, setShowDetailCompromise] = useState(false);

  return (
    <Container>
      <div id="containerHeader">
        <p>Dia: {dayClicked}</p>
        <button
          type="button"
          onClick={() => setShowDetailCompromise(!showDetailCompromise)}
        >
          {showDetailCompromise ? (
            <FiEyeOff size={24} color={colors.main} />
          ) : (
            <FiEye size={24} color={colors.main} />
          )}
        </button>
      </div>

      <div id="contentCompromises">
        {compromises.length === 0 && (
          <h3>Não há serviços listados para este dia!</h3>
        )}

        {compromises.map(compromise => {
          if (compromise.day === dayClicked) {
            return (
              <CompromiseRow
                key={compromise.id}
                compromise={compromise}
                showDetail={showDetailCompromise}
              />
            );
          }

          return null;
        })}
      </div>
    </Container>
  );
};

export default ListCompromises;
