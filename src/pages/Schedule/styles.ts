import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  height: 75vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  margin: 0 1rem;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  // ----- Container Calendar -----
  .react-calendar {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.main};
    border-radius: 0.5rem;
  }
  // ------------------------------

  // ----- Title Mounth Calendar -----
  .react-calendar__navigation__label span {
    color: ${props => props.theme.colors.main};
  }
  // ---------------------------------

  // ----- Hover Buttons -----
  .react-calendar button:hover {
    background: ${props => props.theme.colors.mainHover};
  }

  .react-calendar__navigation button:enabled:hover {
    background: ${props => props.theme.colors.mainHover};
  }
  // -------------------------

  // ----- Day Clicked -----
  .react-calendar__tile--active {
    background: ${props => props.theme.colors.main};
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${props => props.theme.colors.main};
  }
  // -----------------------

  // ----- Today -----
  .react-calendar__tile--now {
    background: ${props => props.theme.colors.green};
    color: #fff;
  }
  // -----------------
`;
