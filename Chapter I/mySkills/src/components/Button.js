import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function Button({onPress}) {
  return (
    <TouchableOpacity style={styles.button} 
    onPress={onPress}
    >
        <Text style={styles.buttonText}>
          Adicionar
        </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
})
