import { View, Text } from 'react-native'
import React from 'react'

const CategoryTitle = ({viewstyles,textstyles,title,icon}) => {
  return (
    <View style={viewstyles}>
      <Text style={textstyles}>{icon} {title}</Text>
    </View>
  )
}

export default CategoryTitle