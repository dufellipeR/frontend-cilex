import React from 'react';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';
import ModuleCard from '../../components/ModuleCard';

import { Container, Main } from './styles';

const Inventory: React.FC = () => {
  return (
    <Container>
      <Header pageName="Estoque" />
      <ButtonBack destinationBack="/menu" />
      <Main>
        <ModuleCard
          to="/inventory/product"
          classIcon="bi bi-arrow-left-right"
          title="Transações"
          description="Gerencie suas transações"
        />
        <ModuleCard
          to="/inventory/storage"
          classIcon="bi bi-handbag"
          title="Estoques"
          description="Gerencie seus estoques"
        />
        <ModuleCard
          to="/inventory/product"
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
          to="/inventory/unitmeasure"
          classIcon="bi bi-box-seam"
          title="Unidade de Medida"
          description="Gerencie suas unidades de medidas"
        />
      </Main>
    </Container>
  );
};

export default Inventory;
