import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryButton = ({viewstyles,textstyles,title,icon,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={viewstyles}>
      <Text style={textstyles}>{icon} {title}</Text>
    </View>
    </TouchableOpacity>
  )
}

export default CategoryButton