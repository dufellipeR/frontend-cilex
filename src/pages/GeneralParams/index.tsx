import React, { useState } from 'react';

import Header from '../../components/Header';

import { Container, Main, Section } from './styles';

const GeneralParams: React.FC = () => {
  const [mainColor, setMainColor] = useState('');

  return (
    <Container>
      <Header pageName="Parâmetros Gerais" />
      <Main>
        <Section>
          <h3>Cores do Sistema</h3>

          <div className="box-input">
            <span>Cor Principal</span>
            <input
              type="color"
              name="main"
              value={mainColor}
              onChange={e => setMainColor(e.target.value)}
            />
            <span>{mainColor}</span>
          </div>
        </Section>
        <Section>
          <h3>Imagens</h3>

          <div className="box-input">
            <span>Logo</span>
            <input type="file" name="logo" />
          </div>
        </Section>
        <button type="button">Salvar</button>
      </Main>
    </Container>
  );
};

export default GeneralParams;
