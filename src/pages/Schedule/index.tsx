import React, { useState } from 'react';
import Calendar from 'react-calendar';

import Header from '../../components/Header';

import 'react-calendar/dist/Calendar.css';

import { Container, Main } from './styles';

const Schedule: React.FC = () => {
  const [dayClicked, setDayClicked] = useState<string>(
    new Date().toLocaleDateString(),
  );

  function handleClickDay(day: Date) {
    setDayClicked(day.toLocaleDateString());
  }

  return (
    <Container>
      <Header pageName="Agenda" />
      <Main>
        <Calendar onClickDay={value => handleClickDay(value)} />
        {dayClicked && <p>Dia Clicado: {dayClicked}</p>}
      </Main>
    </Container>
  );
};

export default Schedule;
