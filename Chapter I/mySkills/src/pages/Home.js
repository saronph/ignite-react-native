import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

export default function Home() {
  const [newSkill, setNewSkill] = React.useState('');
  const [mySkills, setMySkills] = React.useState([]);

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill])
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo, Saron</Text>

      <TextInput 
        style={styles.input}
        placeholder={'New skill'} 
        placeholderTextColor='#999'
        onChangeText={setNewSkill}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddNewSkill}>
        <Text style={styles.buttonText}>
          Adicionar
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, {marginTop: 20, marginBottom: 16}]}>
        My skills
      </Text>

     {mySkills.map((skill, index) => (
      <TouchableOpacity key={index} style={styles.buttonSkill} >
       <Text style={styles.textSkill} >
         {skill}
       </Text>
      </TouchableOpacity>
     ))}

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
  button: {
    backgroundColor: '#A370F7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  buttonSkill: {
    backgroundColor: '#1F1e25',
    alignItems: 'center',
    marginBottom: 8,
    padding: 15,    
    borderRadius: 50,
    fontSize: 17,
    fontWeight: 'bold'
  },
  textSkill: {
    color: '#fff',    
    fontSize: 24
  },
})
