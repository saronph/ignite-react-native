import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

import HighlightCard from '../../components/HighlightCard';
import TransactionCard, { TransactionCardProps } from '../../components/TransactionCard';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import * as S from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
interface HighlightData {
  entries: HighlightProps,
  expensives: HighlightProps,
  total: HighlightProps
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = React.useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection
    .filter(transaction => transaction.type === type);

    if(collectionFiltered.length === 0) {
      return 0
    }

    const lastTransaction = new Date (
    Math.max.apply(Math, collectionFiltered
    .map(transaction => new Date(transaction.date).getTime())))      

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long'})}`;  
  }
  
  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];
    
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if(item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expensiveTotal += Number(item.amount)
        }

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

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionExpensives === 0 
    ? 'N??o h?? transa????es'
    : `Do dia 01 ?? ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 
        ? 'N??o h?? transa????es' 
        : `??ltima entrada dia ${lastTransactionEntries}`
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpensives === 0
        ? 'N??o h?? transa????es' 
        : `??ltima entrada dia ${lastTransactionExpensives}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false);
  }

  React.useEffect(() => {
    loadTransactions()
  }, []);

  useFocusEffect(React.useCallback(() => {
    loadTransactions()
  }, []));

  return (
    <S.Container>      
      {
        isLoading ? 
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large"/> 
        </S.LoadContainer>
        :
        <>
        <S.Header>
          <S.UserWrapper>
            <S.UserInfo>
              <S.UserPhoto source={{ uri: user.photo }} />

              <S.User>
                <S.UserGreetings>Ol??,</S.UserGreetings>
                <S.UserName>{user.name}</S.UserName>
              </S.User>
            </S.UserInfo> 

            <S.LogoutButton onPress={signOut}>
              <S.Icon name='power' />  
            </S.LogoutButton>      
          </S.UserWrapper>
        </S.Header>
        
        <S.HighlightCards>
          <HighlightCard 
            title="Entradas" 
            amount={highlightData.entries.amount} 
            lastTransaction={highlightData.entries.lastTransaction} 
            type="up"
          />
          <HighlightCard 
            title="Sa??das" 
            amount={highlightData.expensives.amount} 
            lastTransaction={highlightData.expensives.lastTransaction} 
            type="down"
          />   
          <HighlightCard 
            title="Total" 
            amount={highlightData.total?.amount} 
            lastTransaction={highlightData.total.lastTransaction} 
            type="total"
          />      
          
        </S.HighlightCards>

        <S.Transactions>
          <S.Title>Listagem</S.Title>

          <S.TransactionList 
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({item}) => 
              <TransactionCard data={item} />
            }          
          />        
        </S.Transactions>
      </>
      }   
    </S.Container>
  )
}
