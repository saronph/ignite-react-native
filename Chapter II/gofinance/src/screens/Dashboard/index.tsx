import React from 'react';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

import * as S from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export default function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/05/2021"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hambúrguer",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "13/05/2021"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'home'
      },
      date: "13/05/2021"
    },
]

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

        <S.TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <TransactionCard data={item} />
          }          
        />        
      </S.Transactions>

    </S.Container>
  )
}
