import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import HistoryCard from '../../components/HistoryCard';
import { TransactionCardProps } from '../../components/TransactionCard';
import { categories } from '../../utils/categories';

import * as S from './styles';

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percentFormatted: string;
  percent: number;
}

const Resume = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [totalByCategories, setTotalByCategories] = React.useState<CategoryData[]>([]);

  const theme = useTheme();

  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next') {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate)
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate)
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey); 
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted
    .filter((expensive: TransactionCardProps) => 
    expensive.type === 'negative' &&
    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
    new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives
    .reduce((accumulator: number, expensive: TransactionCardProps) => {
      return accumulator + Number(expensive.amount)
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionCardProps) => {
        if(expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if(categorySum > 0) {
        const totalFormatted = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (categorySum / expensivesTotal * 100);
        const percentFormatted = `${percent.toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted
        })
      }      
    })

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  } 

  useFocusEffect(React.useCallback(() => {
    loadData()
  }, [selectedDate]));

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>
      {
      isLoading ? 
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large"/> 
        </S.LoadContainer> :

      <S.Content
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: useBottomTabBarHeight()
      }}
      >
        
      <S.MonthSelect>
        <S.MonthSelectButton onPress={() => handleDateChange('prev')}>
          <S.MonthSelectIcon name="chevron-left" />
        </S.MonthSelectButton>

        <S.Month>
          {format(selectedDate, 'MMMM, yyyy', { locale: ptBR})}
        </S.Month>

        <S.MonthSelectButton onPress={() => handleDateChange('next')}>
          <S.MonthSelectIcon name="chevron-right" />
        </S.MonthSelectButton>
      </S.MonthSelect>
      
        <S.ChartContainer>
          <VictoryPie 
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { 
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={80}
            x="percentFormatted"
            y="total"
          />
        </S.ChartContainer>

        {
          totalByCategories.map(item => (
            <HistoryCard 
              key={item.key}
              title={item.name} 
              amount={item.totalFormatted}
              color={item.color}
            />
          ))
        }    
      </S.Content>  
    }
    </S.Container>
  );
}

export default Resume;