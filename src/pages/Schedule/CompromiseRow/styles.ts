import styled from 'styled-components';

interface ServiceIdentifierProps {
  color: string;
}

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem;

  background: ${props =>
    `linear-gradient(to right, ${props.theme.colors.mainHover}, #FBFBFB)`};
  border-radius: 1rem;
`;

export const InsideContainer = styled.div`
  width: 80%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const ServiceIdentifier = styled.div<ServiceIdentifierProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  background: ${props => props.color};
`;

export const AlignTexts = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 0.5rem;
`;
