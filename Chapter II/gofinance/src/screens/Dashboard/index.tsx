import React from 'react';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard from '../../components/TransactionCard';

import * as S from './styles';

export default function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.UserPhoto source={{ uri: 'https://avatars.githubusercontent.com/u/54987514?v=4.png'}} />

            <S.User>
              <S.UserGreetings>Olá,</S.UserGreetings>
              <S.UserName>Saron</S.UserName>
            </S.User>
          </S.UserInfo>  

          <S.Icon name='power' />        
        </S.UserWrapper>
      </S.Header>
      
      <S.HighlightCards>
        <HighlightCard 
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 13 de maio" 
          type="up"
        />
        <HighlightCard 
          title="Saídas" 
          amount="R$ 1.259,00" 
          lastTransaction="Última entrada dia 03 de maio" 
          type="down"
        />   
        <HighlightCard 
          title="Total" 
          amount="R$ 16.141,00" 
          lastTransaction="De 01 à 18 de maio" 
          type="total"
        />      
        
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <TransactionCard />
      </S.Transactions>

    </S.Container>
  )
}
