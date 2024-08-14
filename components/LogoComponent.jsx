import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link} from 'expo-router'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'

export default function LogoComponent() {
  
  return (
    <Link href={'/'} push >
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
        padding: 5,
        marginRight:10
    }
})