import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { transparentize } from 'polished';
import { toast } from 'react-toastify';

import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useUpdateLogo } from '../../hooks/useUpdateLogo';

import camera from '../../assets/camera.svg';
import cilexLogo from '../../assets/cilex-logo.png';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';

import {
  Container,
  ContainerActions,
  ContainerInputFile,
  Main,
  Section,
} from './styles';

const GeneralParams: React.FC = () => {
  const { theme, toggleTheme } = useToggleTheme();
  const { setLogo } = useUpdateLogo();
  const history = useHistory();

  const [mainColor, setMainColor] = useState(theme.colors.main);
  const [stateLogo, setStateLogo] = useState('');

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setStateLogo(e.target.files[0]);
  };

  const previewLogo = useMemo(() => {
    return stateLogo ? URL.createObjectURL(stateLogo) : null;
  }, [stateLogo]);

  const handleSaveParams = () => {
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

    toast.success('Parâmetros atualizados!');
    history.push('/menu');
  };

  const handleResetParams = () => {
    toggleTheme({
      title: 'orange',
      colors: {
        main: '#ff7a00',
        mainHover: transparentize(0.8, '#ff7a00'),
        green: '#8DC73E',
      },
    });

    setLogo(cilexLogo);
    toast.success('Parâmetros reiniciados!');
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
            <ContainerInputFile
              style={{ backgroundImage: `url(${previewLogo})` }}
              hasThumb={stateLogo}
            >
              <span>Logo</span>
              <input type="file" name="logo" onChange={onSelectFile} />
              <img src={camera} alt="Select img" />
            </ContainerInputFile>
          </div>
        </Section>
        <ContainerActions>
          <Button onClick={handleResetParams} layoutColor="button-outline">
            Reiniciar
          </Button>
          <Button onClick={handleSaveParams} layoutColor="button-green">
            Salvar
          </Button>
        </ContainerActions>
      </Main>
    </Container>
  );
};

export default GeneralParams;
