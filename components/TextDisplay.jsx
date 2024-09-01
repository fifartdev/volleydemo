import { View, Text, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import RenderHTML from 'react-native-render-html';

const TextDisplay = ({html}) => {

    const { width } = useWindowDimensions()

  return (
    <RenderHTML
    source={{html:html}}
    contentWidth={width}
    ignoredDomTags={['iframe','svg','button']}
  />
  )
}

export default memo(TextDisplay)