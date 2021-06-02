import React from 'react'
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native'

interface SkillCardProps extends TouchableOpacityProps {
  skill: string;
}

export default function SkillCard({skill, ...rest}: SkillCardProps) {

  return (
    <TouchableOpacity style={styles.buttonSkill} {...rest}>
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

