import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const IconButton = ({onPress,icon}) => {
  return (
    <TouchableOpacity onPress={onPress}>
            {icon}
    </TouchableOpacity>
  )
}

export default IconButton

const styles = StyleSheet.create({})