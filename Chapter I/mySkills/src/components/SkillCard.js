import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function SkillCard({skill}) {
  return (
    <TouchableOpacity style={styles.buttonSkill} >
       <Text style={styles.textSkill} >
         {skill}
       </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({ 
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

