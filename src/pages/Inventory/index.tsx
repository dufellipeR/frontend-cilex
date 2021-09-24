import React from 'react';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';
import ModuleCard from '../../components/ModuleCard';

import { Container, Main } from './styles';

const Inventory: React.FC = () => {
  return (
    <>
      <Container>
        <Header pageName="Estoque" />
        <ButtonBack destinationBack="/menu" />
        <Main>
          <ModuleCard
            to="/inventory/product/register"
            classIcon="bi bi-box-seam"
            title="Produtos"
            description="Gerencie seus produtos"
          />
          <ModuleCard
            to="/inventory/type"
            classIcon="bi bi-box-seam"
            title="Tipo"
            description="Gerencie seus tipos"
          />
          <ModuleCard
            to="/inventory/group"
            classIcon="bi bi-box-seam"
            title="Grupo"
            description="Gerencie seus grupos"
          />
          <ModuleCard
            to="/inventory/subgroup"
            classIcon="bi bi-box-seam"
            title="Sub-grupo"
            description="Gerencie seus sub-grupos"
          />
          <ModuleCard
            to="/inventory/family"
            classIcon="bi bi-box-seam"
            title="Família"
            description="Gerencie suas famílias"
          />
          <ModuleCard
            to="/inventory/subfamily"
            classIcon="bi bi-box-seam"
            title="Sub-família"
            description="Gerencie suas sub-famílias"
          />
          <ModuleCard
            to="/inventory/application"
            classIcon="bi bi-box-seam"
            title="Aplicação"
            description="Gerencie suas aplicações"
          />
          <ModuleCard
            to="/inventory/dimension"
            classIcon="bi bi-box-seam"
            title="Dimensão do Produto"
            description="Gerencie suas dimensões dos produtos"
          />
          <ModuleCard
            to="/inventory/umPurchase"
            classIcon="bi bi-box-seam"
            title="U.M. de Compra"
            description="Gerencie suas unidades de medida de compras"
          />
          <ModuleCard
            to="/inventory/umUse"
            classIcon="bi bi-box-seam"
            title="U.M. de Uso"
            description="Gerencie suas unidades de medida de uso"
          />
        </Main>
      </Container>
    </>
  );
};

export default Inventory;
