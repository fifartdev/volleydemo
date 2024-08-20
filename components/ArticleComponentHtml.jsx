import { View, Text, ActivityIndicator, useWindowDimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {useEffect, memo} from 'react'
import {WebView} from 'react-native-webview'
import he from 'he'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { useRouter } from 'expo-router';


function ArticleComponentHtml({image,title,content,views,date,author,similarCatPosts,id}) {
  const postDate = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const postTime = (d) => { return new Date(d).toLocaleTimeString('el-GR')}
  const router = useRouter()
const { width } = useWindowDimensions()  

  const filteredPosts = similarCatPosts.filter(f => f.id != id)
  // console.log('IDs are: ', filteredPosts.map(f=>f.id));
  // console.log('Current id is: ', id);
  

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
    <View style={{flexDirection:'row', height:240, borderBottomWidth:4, borderBottomColor: '#f8f8f8'}}>
    <Animated.Image
        source={
          image ? { uri: image } : require('../assets/volleyland_logo.png')
        }
        style={styles.articleImage}
        entering={FadeIn.easing(Easing.ease)}
      />
      <Text style={styles.title}>{he.decode(title)}</Text>
    </View>
    <View style={styles.viewsContainer}>
    <Text style={styles.metaText}><Ionicons name="calendar" size={10} color="#fff" /> { postDate(date)} {postTime(date)}</Text>
    <Text style={styles.metaText}><Feather name="pen-tool" size={10} color="#fff" /> {author}</Text>
    <Text style={styles.metaText}><Ionicons name="eye" size={10} color="#fff" /> {views}</Text>
    </View>
      <View style={{flex: 1}}>
      <RenderHTML
        source={{html:content}}
        contentWidth={width}
        ignoredDomTags={['iframe','svg']}
      />
      </View>
      <Text style={{fontSize:14,fontWeight:'bold',marginBottom:2}}>Διαβάστε Επίσης: </Text>
      <View style={{flex:1,flexDirection:'row',flexWrap: 'wrap',justifyContent:'space-between', width:'100%',marginBottom:50}}>
        {
          filteredPosts?.map((p)=>(
        <TouchableOpacity onPress={()=>router.replace(`/articles/${p.id}`)} key={p.id} style={{margin:2,width:'48%'}}>
          <Image source={p.fimg_url ? {uri: p.fimg_url} : require('../assets/volleyland_logo.png')} style={{width:'100%',height:150}} />
          <Text>{he.decode(p.title.rendered)}</Text>
        </TouchableOpacity>
          ))

        }
      </View>
    </ScrollView>
  )
}

export default memo(ArticleComponentHtml)

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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 4,
        backgroundColor:'#2b72b9',
        opacity:0.9,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        top: 0,
        right: 0,
        position: 'absolute',
        width: '100%'
      },
      cardViews: {
        fontSize: 10,
        color: '#fff',
        marginLeft: 10,
      },
      metaData: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#2b72b9',
        paddingHorizontal: 4,
        paddingVertical: 4,
        opacity: 0.9
      },
      metaText: {
        color: '#fff',
        fontSize: 12
      }
})