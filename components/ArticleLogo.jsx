import { StyleSheet, Image } from 'react-native'
import React from 'react'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { Link } from 'expo-router'

export default function ArticleLogoComponent() {
  
  return (
    <Link href={'/'}>
      <Animated.View entering={FadeIn.duration(500).easing(Easing.ease)}>
        <Image 
            source={require('../assets/volleyland_logo.png')}
            style={styles.logo}
        />    
      </Animated.View>
    </Link>
  
  )
}

const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        padding: 5
    }
})