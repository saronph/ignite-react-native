import React from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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

  const [category, setCategory] = React.useState({
    key: 'category',
    name: 'Categoria'
  });

  const {
    control,
    handleSubmit,
    formState: { errors }    
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
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

  function handleRegister(form: FormData) {
    if(!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if(category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

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
                  type="up"
                  onPress={() => handleTransactionTypeSelect('up')}
                  isActive={transactionType === 'up'}
                />
                <TransactionTypeButton 
                  title="Outcome"
                  type="down"
                  onPress={() => handleTransactionTypeSelect('down')}
                  isActive={transactionType === 'down'}
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