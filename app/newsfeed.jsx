import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useGlobalSearchParams, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../api/services'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LogoComponent from '../components/LogoComponent'
import AnimatedHeaderTitle from '../components/AnimatedHeaderTitle'
import Card from '../components/Card'
import CardLoader from '../components/CardLoader'

const newsFeedPage = () => {
  const router = useRouter()
  const query = useQuery({
    queryKey:['recentposts'],
    queryFn: ()=>fetchPosts({perPage:25})
  })

  // console.log('Current Category: ', query.data);
  // console.log('PARAMS ARE: ', params);
  

  if(query.isLoading || query.isFetching){
   return (
    
    <View style={styles.container}>  
     <Stack.Screen 
        options={{
          headerTitle: 'Ροή Ειδήσεων',
          headerRight: ()=> <LogoComponent />,
          headerTitleAlign: 'center'
        }}
      />
       {[1,2,3,4,5,6,7,8,9,10].map(i=> 
                   <CardLoader key={i.toString()}/>
                   )}
    </View>
   ) 
  }
  

  return (
    <View>
      <Stack.Screen 
        options={{
          headerTitle: 'Ροή Ειδήσεων',
          headerRight: ()=> <LogoComponent />,
          headerTitleAlign: 'center'
        }}
      />
     <FlatList
      data={query.data}
      keyExtractor={(item) =>item.id.toString()}
      renderItem={({item}) => (
        <Card 
              title={item.title.rendered} 
              onPress={() => router.push(`/articles/${item.id}`)} 
              image={item.fimg_url} 
              views={item.post_views_count} 
              goToCategory={ item.categories_names[0]==='Featured' ? ()=> router.push(`categories/${item.categories[1]}?title=${item.categories_names[1]}`) : ()=> router.push(`categories/${item.categories[0]}?title=Διάφορα`)} 
              category={item.categories_names[0]==='Featured' ? item.categories_names[1] : 'Διάφορα' } 
              thedate={item.date}
              thetime={item.date}
              author={item.author_name}
              />
      ) }
     />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop: 20
  }
})

export default newsFeedPage