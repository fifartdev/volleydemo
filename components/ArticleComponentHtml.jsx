import { View, Text, useWindowDimensions, StyleSheet, Image, TouchableOpacity, Platform, BackHandler, Dimensions } from 'react-native'
import React, { memo, useEffect, useState} from 'react'
import he from 'he'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TextDisplay from './TextDisplay';
import { LinearGradient } from 'expo-linear-gradient';
import Separator from './Separator';
import {WebView} from 'react-native-webview';


function ArticleComponentHtml({image,title,content,views,date,author,similarCatPosts,id,plaintext,uri}) {
  const postDate = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const postTime = (d) => { return new Date(d).toLocaleTimeString('el-GR')}
  const [shown,setShown] = useState(true)
  const [resumeShown,setResumeShown] = useState(false)
  const router = useRouter()
  //const { height: screenHeight } = Dimensions.get('window');
  const { height } = useWindowDimensions()

  const [webViewHeight, setWebViewHeight] = useState(height); // State to handle WebView height dynamically

  // Function to handle dynamic WebView height
  const onWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log('Message from WebView:', message);
    const newHeight = parseInt(message*0.45,10);
    console.log('New Heigh will be: ',newHeight);
    
    if (!isNaN(newHeight)) {
      setWebViewHeight(newHeight);
    }
  };

  const filteredPosts = similarCatPosts.filter(f => f.id != id)
  
  const readText =  () => {
    const text = he.decode(plaintext)
    Speech.speak(text,{
      language:'el-GR'
    })
    setShown(false)
  }
  const pauseRead = () => {
    Speech.pause()
    setResumeShown(true)
  }
  const resumeRead = () => {
    Speech.resume()
    setResumeShown(false)
  }
  const stopRead = ()=>{
    Speech.stop()
    setShown(true)
    setResumeShown(false)
  }

// TEXT 2 SPEACH ENDS HERE

const sourceCode = `<div style='font-size:2.8em !important;font-family:Arial; padding:0 4 0 4;'>${content}</div>`

// return (
//   <WebView
//       style={styles.container}
//       source={{ html: sourceCode }}
//     />
// )
// }

const javascriptInj = `
window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.documentElement.offsetHeight));
  let header = document.querySelector('.tdi_6');
  header.style.display="none";
`

  useEffect(()=>{
    console.log('Screen Height is: ', height);
    
    console.log('Height is:',webViewHeight);
    
  },[])

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{backgroundColor:'#fff',paddingHorizontal:2}}
    >
    <View style={{flexDirection:'row', height:240, borderBottomWidth:4, borderBottomColor: '#f8f8f8'}}>
    <Animated.Image
        source={
          image ? { uri: image } : require('../assets/volleyland_logo.png')
        }
        style={styles.articleImage}
        entering={FadeIn.easing(Easing.ease)}
      />
      <LinearGradient 
        colors={['#000', 'transparent']} 
        start={{ x: 0, y: 1 }} 
        end={{ x: 1, y: 0 }} 
        style={styles.gradient}
      />
    </View>
    <View style={styles.viewsContainer}>
    <Text style={styles.metaText}><Ionicons name="calendar" size={10} color="#fff" /> { postDate(date)} {postTime(date)}</Text>
    <Text style={styles.metaText}><Feather name="pen-tool" size={10} color="#fff" /> {author}</Text>
    <Text style={styles.metaText}><Ionicons name="eye" size={10} color="#fff" /> {views}</Text>
    </View>
      <View>
      { Platform.OS === 'ios' ? 
      <View style={styles.soundBar}>
        <Text style={styles.soundBarText}>Ακούστε το Άρθρο: </Text>
        { resumeShown && <MaterialCommunityIcons color={'#fff'} size={20} name='restart' onPress={resumeRead} style={{marginHorizontal:5}} /> }
        {
          shown ?
          <Ionicons size={20} color={'#fff'} name='play' onPress={readText}/> :
          <>
         { !resumeShown && <Ionicons size={20} color={'#fff'} name='pause' onPress={pauseRead} style={{marginHorizontal:5}}/>}
          <Ionicons size={20} color={'#fff'} name='stop' onPress={stopRead} style={{marginHorizontal:5}} />
          </>

        } 
      </View> : 
       <View style={styles.soundBar}>
       <Text style={styles.soundBarText}>Ακούστε το Άρθρο: </Text>
       {
         shown ?
        <Ionicons size={20} color={'#fff'} name='play' onPress={readText}/> :
        <Ionicons size={20} color={'#fff'} name='stop' onPress={stopRead} style={{marginHorizontal:5}} />
      
       } 
     </View>  

      }  
     {/*HERE TO PLACE THE TEXT COMPONENT */}
     <Text style={styles.title}>{he.decode(title)}</Text>
     <Separator styles={{backgroundColor:'#444',width:'30%',height:1,marginVertical:10 }}/>
     {/* <TextDisplay html={content} uri={uri}/> */}
     
     {/* <WebView
          style={{ width: '100%', height:webViewHeight}} // Set the WebView height dynamically
          source={{ html: sourceCode }}
          onMessage={onWebViewMessage} // Listen for height messages
          injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.documentElement.offsetHeight));"
          javaScriptEnabled={true}
          scalesPageToFit={false}
          scrollEnabled={false}
          
        /> */}
      <WebView
          style={{ width: '100%', height:webViewHeight}} // Set the WebView height dynamically
          source={{ uri: uri }}
          onMessage={onWebViewMessage} // Listen for height messages
          injectedJavaScript={javascriptInj}
          javaScriptEnabled={true}
          scalesPageToFit={false}
          scrollEnabled={false}
          
        />  


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


      </View>
      
    </ScrollView>
  )
}

export default ArticleComponentHtml

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'#000',
      },
      articleImage: {
        width: '100%',
        height: '100%',
        position:'absolute'
      },
      gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1, // Ensure gradient is above the image but below the text
      },
      titleContainer: {
        marginBottom: 10,
      },
      viewsContainer:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        opacity:0.9,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        top: 160,
        left: 0,
        position: 'absolute',
        width: '100%'
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
        backgroundColor: '#444',
        paddingHorizontal: 4,
        paddingVertical: 4,
        opacity: 0.9
      },
      metaText: {
        color: '#fff',
        fontSize: 14,
        marginVertical:3
      },
      soundBar:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: '#444',
        padding: 4,
        top:-4
      },
      soundBarText: {
        fontSize:20,
        fontWeight:'bold',
        color: '#fff'

      },
      container:{
        
      }
    })