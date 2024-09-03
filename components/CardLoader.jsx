import ContentLoader, { Rect} from 'react-content-loader/native'

import React from 'react'
import { Dimensions, useWindowDimensions } from 'react-native'

const CardLoader = ({props}) => {

    const { width } = useWindowDimensions()

  return (
<ContentLoader viewBox="0 0 500 220" height={180} width={width} {...props} backgroundColor='#ccc'>
    <Rect x="6" y="3" rx="10" ry="10" width="500" height="220" />
</ContentLoader>
  )
}

export default CardLoader