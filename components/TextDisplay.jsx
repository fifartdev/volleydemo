import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import RenderHTML from 'react-native-render-html';

const TextDisplay = ({html}) => {

    const { width } = useWindowDimensions()

  return (
    <RenderHTML
    source={{html:html}}
    contentWidth={width}
    ignoredDomTags={['iframe','svg','button']}
    tagsStyles={{p:{fontSize:15,lineHeight:20},a:{fontSize:15,lineHeight:20}}}
  />
  )
 
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default memo(TextDisplay)