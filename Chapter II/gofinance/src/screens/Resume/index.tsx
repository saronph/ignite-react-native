import React from 'react';

import HistoryCard from '../../components/HistoryCard';

import * as S from './styles';

const Resume = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <HistoryCard 
        title='Alimentos' 
        amount='R$ 200,50'
        color='blue'
      />
    </S.Container>
  );
}

export default Resume;