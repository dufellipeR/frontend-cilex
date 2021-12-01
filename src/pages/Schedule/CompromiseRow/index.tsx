import React from 'react';

import {
  Container,
  InsideContainer,
  ServiceIdentifier,
  AlignTexts,
} from './styles';

interface CompromiseRowProps {
  compromise: {
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
  };
  showDetail: boolean;
}

const CompromiseRow: React.FC<CompromiseRowProps> = ({
  compromise,
  showDetail,
}) => {
  return (
    <Container>
      <InsideContainer>
        <ServiceIdentifier color={compromise.service.color} />

        <AlignTexts>
          <p>
            <b>{compromise.hour}</b> - {compromise.service.title}
          </p>

          {showDetail && (
            <>
              <p>Dono: {compromise.pet.owner.name}</p>
              <p>Endereço: {compromise.pet.owner.address}</p>
            </>
          )}
        </AlignTexts>
      </InsideContainer>
    </Container>
  );
};

export default CompromiseRow;
