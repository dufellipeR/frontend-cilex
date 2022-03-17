import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { transparentize } from 'polished';
import { toast } from 'react-toastify';

import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useLogoState } from '../../hooks/useLogoState';

import camera from '../../assets/camera.svg';
import cilexLogo from '../../assets/cilex-logo.png';

import Header from '../../components/Header';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import InputFormik from '../../components/InputFormik';

import {
  Container,
  ContainerActions,
  ContainerInputFile,
  Main,
  Section,
} from './styles';
import api from '../../services/api';
import { useCompany } from '../../hooks/useCompany';

const GeneralParams: React.FC = () => {
  const { theme, toggleTheme } = useToggleTheme();
  // const { setLogo } = useLogoState();
  const { company } = useCompany();
  const history = useHistory();

  const [mainColor, setMainColor] = useState(theme.colors.main);
  const [stateLogo, setStateLogo] = useState<string>();

  // useEffect(() => {
  //   setMainColor(company.company_color);

  //   if (company.company_logo) {
  //     fetch(`http://localhost:3333/api/v1/files/${company.company_logo}`)
  //       .then(responsePic => {
  //         return responsePic.blob();
  //       })
  //       .then(myBlob => {
  //         const objectUrl = URL.createObjectURL(myBlob);
  //         setStateLogo(objectUrl);
  //       });
  //   }
  // }, []);

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

      api
        .patch(`/company/${company.id}/updateColor`, {
          company_color: mainColor,
        })
        .then(() => {
          toast.success('Atualizado com sucesso');
        });
    }

    if (stateLogo) {
      const objectUrl = URL.createObjectURL(stateLogo);
      // setLogo(objectUrl);

      // const formData = new FormData();
      // formData.append('company_logo', stateLogo);

      // api.patch(`/company/${company.id}`, formData).then(() => {
      //   toast.success('Atualizado com sucesso');
      //   history.push('/menu');
      // });
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

    api
      .patch(`/company/${company.id}/updateColor`, {
        company_color: mainColor,
      })
      .then(() => {
        toast.success('Parâmetros reiniciados!');
      });
    setMainColor('#ff7a00');
    // setLogo(cilexLogo);
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
              style={{
                backgroundImage: `url(${previewLogo})`,
              }}
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
