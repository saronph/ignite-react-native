import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

import * as S from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export default function Dashboard() {
  const [data, setData] = React.useState<DataListProps[]>([]);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        const amount = Number(item.amount)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date
        }
    });

    setData(transactionsFormatted);
  }

  React.useEffect(() => {
    loadTransactions()
  }, []);

  useFocusEffect(React.useCallback(() => {
    loadTransactions()
  }, []));

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

          <S.LogoutButton onPress={() => {}}>
            <S.Icon name='power' />  
          </S.LogoutButton>      
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
