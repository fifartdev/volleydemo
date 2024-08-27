import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

const IconButton = ({onPress,icon}) => {
  return (
    <Pressable onPress={onPress}>
            {icon}
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({})