import React from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Button from '../../components/Form/Button';
import InputForm from '../../components/Form/InputForm';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategoryOptions from '../CategoryOptions';

import * as S from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório')
});

const Register = () => {
  const [transactionType, setTransactionType] = React.useState('');
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);
  
  const navigation = useNavigation();

  const [category, setCategory] = React.useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }    
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);

    if(type === transactionType) {
      setTransactionType('');
    }
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const dataKey = '@gofinances:transactions';

      const data = await AsyncStorage.getItem(dataKey); 
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      Alert.alert('Cadastro realizado');

      navigation.navigate('Listagem')

    } catch (error) {
      console.log(error)
      Alert.alert("Não foi possível salvar")
    }
  }

  React.useEffect(() => {
    async function loadData() {
      const dataKey = '@gofinances:transactions';
      
      const showValue = await AsyncStorage.getItem(dataKey); 
      console.log(JSON.parse(showValue!));    
    }

    loadData();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
          <S.Header>
            <S.Title>Cadastro</S.Title>
          </S.Header>

          <S.Form>
            <S.Fields>
              <InputForm 
                name="name"
                control={control}
                placeholder="Nome"
                autoCapitalize="sentences"
                autoCorrect={false}
                returnKeyType='next'
                error={errors.name && errors.name.message}
              />

              <InputForm 
                name="amount"
                control={control}
                placeholder="Valor"
                keyboardType='numeric' 
                error={errors.amount && errors.amount.message}           
              />

              <S.TransactionsTypes>
                <TransactionTypeButton 
                  title="Income"
                  type = 'up'
                  onPress={() => handleTransactionTypeSelect('positive')}
                  isActive={transactionType === 'positive'}
                />
                <TransactionTypeButton 
                  title="Outcome"
                  type = 'down'
                  onPress={() => handleTransactionTypeSelect('negative')}
                  isActive={transactionType === 'negative'}
                />
              </S.TransactionsTypes>

              <CategorySelectButton
                title={category.name}
                onPress={handleOpenSelectCategoryModal} 
              />
            </S.Fields>

            <Button title={'Enviar'} onPress={handleSubmit(handleRegister)} />
          </S.Form>

          <Modal visible={categoryModalOpen}>
            <CategoryOptions 
              category={category}
              setCategory={setCategory}
              closeSelectCategory={handleCloseSelectCategoryModal}
            />
          </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;