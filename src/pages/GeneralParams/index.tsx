import React, { useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { useHasUserCompany } from '../../hooks/useGeneralParams';

import Header from '../../components/Header';

import { Container, Main, Section } from './styles';

const GeneralParams: React.FC = () => {
  const { colors, setColors } = useHasUserCompany();
  const themeContext = useContext(ThemeContext);

  const [mainColor, setMainColor] = useState('');
  const [mainHoverColor, setMainHoverColor] = useState('');

  console.log('CORES: ', colors);
  console.log('themeContext: ', themeContext);

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
          <div className="box-input">
            <span>Cor Hover</span>
            <input
              type="color"
              name="main-hover"
              value={mainHoverColor}
              onChange={e => setMainHoverColor(e.target.value)}
            />
            <span>{mainHoverColor}</span>
          </div>
        </Section>
        <Section>
          <h3>Imagens</h3>

          <div className="box-input">
            <span>Logo</span>
            <input type="file" name="logo" />
          </div>
        </Section>
        <button
          type="button"
          onClick={() => {
            setColors({ main: mainColor, mainHover: mainHoverColor });
            themeContext.main = mainColor;
            themeContext.mainHover = mainHoverColor;
          }}
        >
          Salvar
        </button>
      </Main>
    </Container>
  );
};

export default GeneralParams;
