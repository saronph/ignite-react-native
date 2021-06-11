import React from 'react';
import { Modal } from 'react-native';

import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategoryOptions from '../CategoryOptions';

import * as S from './styles';

const Register = () => {
  const [transactionType, setTransactionType] = React.useState('');
  const [categoryModalOpen, setCategoryModalOpen] = React.useState(false);

  const [category, setCategory] = React.useState({
    key: 'category',
    name: 'Categoria'
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

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input 
            placeholder="Nome"
          />

          <Input 
            placeholder="Valor"
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

        <Button title={'Enviar'} />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategoryOptions 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
}

export default Register;