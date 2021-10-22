import React, { useEffect, useState } from 'react';
import { transparentize } from 'polished';

import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useUpdateLogo } from '../../hooks/useUpdateLogo';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main, Section } from './styles';

const GeneralParams: React.FC = () => {
  const { toggleTheme } = useToggleTheme();
  const { setLogo } = useUpdateLogo();

  const [mainColor, setMainColor] = useState('');
  const [stateLogo, setStateLogo] = useState('');

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setStateLogo(e.target.files[0]);
  };

  return (
    <Container>
      <Header pageName="Parâmetros Gerais" />
      <ButtonBack destinationBack="/menu" />
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
            <input type="file" name="logo" onChange={onSelectFile} />
          </div>
        </Section>
        <Button
          onClick={() => {
            if (mainColor) {
              toggleTheme({
                title: 'customized',
                colors: {
                  main: mainColor,
                  mainHover: transparentize(0.8, mainColor),
                  green: '#8DC73E',
                },
              });
            }

            if (stateLogo) {
              const objectUrl = URL.createObjectURL(stateLogo);
              setLogo(objectUrl);
            }
          }}
          layoutColor="button-green"
        >
          Salvar
        </Button>
      </Main>
    </Container>
  );
};

export default GeneralParams;
