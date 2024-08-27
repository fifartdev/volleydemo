import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CategoryButton = ({viewstyles,textstyles,title,icon,onPress}) => {
  return (
    <Pressable onPress={onPress}>
    <View style={viewstyles}>
      <Text style={textstyles}>{icon} {title}</Text>
    </View>
    </Pressable>
  )
}

export default CategoryButton