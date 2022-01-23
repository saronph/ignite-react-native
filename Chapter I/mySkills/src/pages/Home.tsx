import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'

import Button from '../components/Button';
import SkillCard from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string
}

export default function Home() {
  const [newSkill, setNewSkill] = React.useState('');
  const [mySkills, setMySkills] = React.useState<SkillData[]>([]);
  const [greetings, setGreetings] = React.useState('');  

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data])
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  React.useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12) {
      setGreetings('Good morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Good afternoon')
    } else {
      setGreetings('Good evening')
    }


  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="welcome">Bem vindo, Saron</Text>

      <Text style={styles.greetings}>
        {greetings}
      </Text>

      <TextInput 
        testID="input-new"
        style={styles.input}
        placeholder={'New skill'} 
        placeholderTextColor='#999'
        onChangeText={setNewSkill}
      />

      <Button testID="button-add" title={'Adicionar'} onPress={handleAddNewSkill} />

      <Text style={[styles.title, {marginTop: 20, marginBottom: 16}]}>
        My skills
      </Text>      

      { mySkills &&
        <FlatList
          testID="flat-list-skills" 
          data={mySkills}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps='never'
          renderItem={({item}) => (
            <SkillCard skill={item.name} onPress={() => handleRemoveSkill(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
        />
      }      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    marginTop: 30,
    marginBottom: 16,
    borderRadius: 7
  },
  greetings: {
    color: '#fff',
  }
})
