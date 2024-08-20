import { View, ActivityIndicator, StyleSheet, Alert, Share,Text, Image, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { fetchPost, fetchPosts } from '../../api/services'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ArticleLogo from '../../components/ArticleLogo'
import IconButton from '../../components/IconButton'
import { initializeStorage, addPostId, removePostId, getPostIds} from '../../utilities/asyncStorage'
import Ionicons from '@expo/vector-icons/Ionicons';
import ArticleComponentHtml from '../../components/ArticleComponentHtml'
import Animated, {FadeIn,Easing,FadeOut} from 'react-native-reanimated'
import Toast from 'react-native-toast-message'

const articleId = () => {
    const params = useLocalSearchParams()
    const query = useQuery({
      queryKey: ['post'],
      queryFn: () => fetchPost(params.articleId),
    });

    const simCatPosts = useQuery({
      queryKey: ['simCatPosts'],
      queryFn: () => fetchPosts({category: query.data.categories[0] == 467 ? query.data.categories[1] : query.data.categories[0], perPage:4})
    })

  
  
    

// HERE STARTS THE CODE FOR THE ADD TO FAVORITES
const queryClient = useQueryClient()
useEffect(()=>{
  initializeStorage()
},[])

const postIds = useQuery({
  queryKey: ['postIds'],
  queryFn: getPostIds
})
const addPostIdMutation = useMutation(
  {
    mutationFn:addPostId,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['postIds'])
    },
  }
);

const removePostIdMutation = useMutation(
  {
    mutationFn:removePostId,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['postIds'])
    },
  }
);

const handleAddPostId = async (id) => {
  const newPostId = id
  await addPostIdMutation.mutateAsync(newPostId);
};

const handleRemovePostId = async (id) => {
  const newPostId = id
  await removePostIdMutation.mutateAsync(newPostId);
}
// HERE ENDS THE CODE FOR THE ADD TO FAVORITES

// HERE STARTS THE SHARE ON SOCIAL 
const shareURL = async (message) => {
  try {
    const result = await Share.share({
      message: message,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        
      } else {
        
      }
    } else if (result.action === Share.dismissedAction) {
      
    }
  } catch (error) {
    Alert.alert(error.message);
  }
};
// HERE ENDS THE SHARE ON SOCIAL

  if(query.isLoading || simCatPosts.isLoading){
    return (
    <>
    <Stack.Screen 
    options={{
      headerTitle: ()=><ArticleLogo />,
      headerTitleAlign: 'center',
      headerBackTitle: 'Πίσω'
    }}
    />
    <ActivityIndicator size={'small'} color={'blue'} />
    </>  
    )
  }
  
  if(query.isError){
    return (
    <>
    <Stack.Screen 
    options={{
      headerTitle: ()=><ArticleLogo />,
      headerTitleAlign: 'center',
      headerBackTitle: 'Πίσω'
    }}
    />
      <Text>Δεν υπάρχουν αποτελέσματα. Πιθανόν να βρίσκεστε εκτός σύνδεσης</Text>
    </>  
    )
  }

  
  

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Συγχαρητήρια',
      text2: 'Το άρθρο αποθηκεύτηκε στη Reading List 👋'
    });
  }
  const removeFavToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Προσοχή',
      text2: 'Το άρθρο διεγράφη από τη Reading List'
    });
  }
  // const theContent = `
  // <html>
  //  <style>
  //   h1,h2,h3,h4,h5,h6,p,span{
  //   font-size: 2.2em !important;
  //   font-family:  Arial, Helvetica, sans-serif; 
  //   }
  //   img {
  //   width: 100% !important;
  //   }
  //   iframe{
  //   width: 100% !important;
  //   height:550px !important;
  //   }
  //  </style>
  //  <body>
  //  ${query?.data.content.rendered}
  //  </body> 
  // </html>
  // ` 

 // console.log(theContent);

  


  return (
    
    <Animated.View style={styles.container} entering={FadeIn.duration(800).easing(Easing.ease)} exiting={FadeOut.easing(Easing.ease)}>
    <Stack.Screen 
    options={{
      headerTitle: ()=> <ArticleLogo />,
      headerBackTitle: 'Πίσω',
      headerTitleAlign: 'center'
    }}
    />
    <ArticleComponentHtml id={params.articleId} image={query?.data.fimg_url} title={query?.data.title.rendered} views={query?.data.post_views_count} date={query?.data.date} author={query?.data.author_name} content={query?.data.content.rendered} similarCatPosts={simCatPosts?.data} />
      <View style={styles.bottomBar}> 
        <View style={styles.bottomBarItem}>
         { postIds?.data.includes(params.articleId) ? 
         <IconButton onPress={()=>{
          handleRemovePostId(params.articleId)
          removeFavToast()   
        }
        } icon={<Ionicons name="bookmark" size={24} color="#2b72b9" /> } /> : 
         <IconButton onPress={()=>{
          handleAddPostId(params.articleId)
          showToast()
          }} icon={<Ionicons name="bookmark-outline" size={24} color="#2b72b9" /> } /> }
        </View>
        <View style={styles.bottomBarItem}><IconButton onPress={()=> shareURL(query?.data.link)} icon={<Ionicons name="share-social" size={24} color="#2b72b9" />}/></View>
      </View>
      <Toast />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    width: '100%',
    backgroundColor: '#fff', // Background color for the bottom bar
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50, // Height of the bottom bar
    borderTopColor: '#ddd',
    paddingBottom:20 // Optional border for the bottom bar
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default articleId
