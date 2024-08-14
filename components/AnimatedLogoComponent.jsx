import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link} from 'expo-router'
import Animated, { FadeInDown, Easing } from 'react-native-reanimated'

export default function AnimatedLogoComponent() {

  return (
    <Animated.View entering={FadeInDown.duration(500).easing(Easing.ease).withInitialValues({ transform: [{ translateY: 400 }] })}>
    <Link href={'/'}>
    <View>
        <Image 
            source={require('../assets/volleyland_logo.png')}
            style={styles.logo}
        />
    </View>
    </Link>
    </Animated.View>
  
  )
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
    }
})