import { View, useWindowDimensions, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';


function SingleArticle({uri}) {
  
  const { height } = useWindowDimensions()
  const [isLoading, setIsLoading] = useState(true);
  const [webViewHeight, setWebViewHeight] = useState(height); // State to handle WebView height dynamically
  const webViewRef = useRef(null);

  const scrollToTopJS = `
    window.scrollTo(0, 0);
    true;  // Ensure the JS returns true
`;
const javascriptInj = `
window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.documentElement.offsetHeight));
  let header = document.querySelector('.tdi_6');
  let sticky_header = document.querySelector('.tdi_33');
  let footer = document.querySelector('.td-footer-wrap');
  header.style.display="none";
  sticky_header.style.display="none";
  footer.style.display="none";
`

  const onLoadStart = () => {
    setIsLoading(true);
  };

  // Once the page finishes loading, show the content
  const onLoadEnd = () => {
    setIsLoading(false);
    if (webViewRef.current) {
        webViewRef.current.injectJavaScript(scrollToTopJS);
      }
  };


  // Function to handle dynamic WebView height
  const onWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    console.log('Message from WebView:', message);
    const newHeight = parseInt(message,10);
    console.log('New Heigh will be: ',newHeight);
    
    if (!isNaN(newHeight)) {
      setWebViewHeight(newHeight);
    }
  };

  



  useEffect(()=>{
    console.log('Screen Height is: ', height);
    
    console.log('Height is:',webViewHeight);
    
  },[])

  return (
    
      <View style={{flex:1}}> 
        {isLoading && (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../assets/volleyland_logo.png')} style={{width:60,height:60, marginTop:50}} />
            <Text style={{marginVertical:40}}>Παρακαλούμε περιμένετε...</Text>
            <ActivityIndicator
              size="large"
              color="#000"
            />
            </View>
      )}
      <WebView
        ref={webViewRef}
        style={{ width: '100%', height: webViewHeight, opacity: isLoading ? 0 : 1 }} 
        source={{ uri: uri }}
        injectedJavaScript={javascriptInj}
        javaScriptEnabled={true}
        onLoadStart={onLoadStart} // Start hiding content while loading
        onLoadEnd={onLoadEnd} // Show content after the JS is injected and loaded
        onMessage={onWebViewMessage}
        scalesPageToFit={false}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
      </View>
  )
}

export default SingleArticle

