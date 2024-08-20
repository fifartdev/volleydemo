import { View, Text, ActivityIndicator, useWindowDimensions, StyleSheet, Image, SafeAreaView } from 'react-native'
import React, {useEffect} from 'react'
import {WebView} from 'react-native-webview'
import he from 'he'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

export default function ArticleComponent({image,title,content,views,date,author}) {
  const postDate = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const postTime = (d) => { return new Date(d).toLocaleTimeString('el-GR')}

const { width } = useWindowDimensions()


  
  //console.log(postIds.data.includes(id) ? 'Yes' : 'No');
  

  return (
    <>
    <View style={{flexDirection:'row', height:180, borderBottomWidth:4, borderBottomColor: '#f8f8f8'}}>
    <Image
        source={
          image ? { uri: image } : require('../assets/volleyland_logo.png')
        }
        style={styles.articleImage}
      />
      <Text style={styles.title}>{he.decode(title)}</Text>
    </View>
    <View style={styles.viewsContainer}>
      <Ionicons name="eye" size={14} color="#fff" /><Text style={styles.cardViews}>{views}</Text>
    </View>
    <View style={styles.metaData}>
        <Text style={styles.metaText}><Ionicons name="calendar" size={14} color="#fff" /> { postDate(date)} {postTime(date)}</Text>
        <Text style={styles.metaText}><Feather name="pen-tool" size={14} color="#fff" /> {author}</Text>
    </View>
      <SafeAreaView style={{flex: 1,marginBottom: 50}}>
      <WebView
        originWhitelist={['*']}
        source={{ html: content }}
        style={{ flex: 1}}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
        showsVerticalScrollIndicator={false}
        renderLoading={()=><ActivityIndicator style={{ position: "absolute", top: 20, left: width / 2 }} size={'small'} color={'blue'} hidesWhenStopped={true} />}
      />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor:'#f8f8f8',
        position:'absolute',
        width:'80%',
        left:0,
        bottom:0,
        opacity:0.8,
        padding: 2
      },
      articleImage: {
        width: '100%',
        height: '100%',
      },
      titleContainer: {
        marginBottom: 10,
      },
      viewsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
        backgroundColor:'black',
        opacity:0.8,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        top: 10,
        right: 10,
        position: 'absolute'
      },
      cardViews: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 10,
      },
      metaData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        paddingHorizontal: 4,
        paddingVertical: 4,
        opacity: 0.9
      },
      metaText: {
        color: '#fff',
      }
})