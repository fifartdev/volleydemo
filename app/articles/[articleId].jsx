import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const articleId = () => {

    const params = useLocalSearchParams()
    console.log(params);
    

  return (
    <View>
      <Stack.Screen 
      options={{
        headerTitle: params.articleId,
        headerBackTitle: 'Πίσω'
      }}
      />  
      <Text>articleId: {params.articleId}</Text>
    </View>
  )
}

export default articleId