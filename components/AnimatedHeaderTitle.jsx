import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, {FadeIn, Easing, FadeOut} from 'react-native-reanimated'

const AnimatedHeaderTitle = ({title}) => {
  return (
    <Animated.View entering={FadeIn.duration(800).easing(Easing.ease)} exiting={FadeOut.easing(Easing.ease)} style={styles.container}><Text style={styles.title}>{title}</Text></Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#306eb6',
        paddingHorizontal: 5,
        paddingVertical:8,
        borderTopStartRadius: 8,
        borderBottomEndRadius:8,
    },
    title: {
        color:'#fff',
        fontWeight: 'bold'
    }
})

export default AnimatedHeaderTitle