import ContentLoader, { Rect} from 'react-content-loader/native'

import React from 'react'
import { Dimensions, useWindowDimensions } from 'react-native'

const CardTitle = ({props}) => {

    const { width } = useWindowDimensions()

  return (
<ContentLoader viewBox="0 0 500 180" height={36} width={310} {...props} backgroundColor='#ccc'>
    <Rect x="0" y="0" rx="30" ry="30" width="1000" height="180" />
</ContentLoader>
  )
}

export default CardTitle