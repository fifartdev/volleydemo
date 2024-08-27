import { View, ActivityIndicator, StyleSheet } from 'react-native'
import React, {useState, useCallback} from 'react'
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../../../api/services'
import { FlatList } from 'react-native-gesture-handler'
import LogoComponent from '../../../components/LogoComponent'
import AnimatedHeaderTitle from '../../../components/AnimatedHeaderTitle'
import Card from '../../../components/Card'

const categoryIdPage = () => {
  const [refreshing,setRefreshing] = useState(false)
  const router = useRouter()
  const params = useGlobalSearchParams()

  const query = useQuery({
    queryKey:['posts'],
    queryFn: ()=>fetchPosts({perPage:25,category: params.categoryId}),
    
  })

  

  // console.log('Current Category: ', query.data);
  // console.log('PARAMS ARE: ', params);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await query.refetch();
    } finally {
      setRefreshing(false);
    }
  }, [query]);

  if(query.isLoading || query.isFetching){
   return (

    <View style={styles.container}>
     <Drawer.Screen 
        options={{
          headerTitle: (query.isLoading || query.isFetching) ? ()=> <ActivityIndicator size={14} color={'#2b72b9'} /> : () => <AnimatedHeaderTitle title={params.title}/>,
          headerRight: ()=> <LogoComponent />,
          headerTitleAlign: 'center'
        }}
      />
      <ActivityIndicator size={20} color={'blue'}/>
    </View>
   ) 
  }
  

  return (
    <View>
      <Drawer.Screen 
        options={{
          headerTitle: (query.isLoading || query.isFetching) ? ()=> <ActivityIndicator size={14} color={'#2b72b9'} /> : () => <AnimatedHeaderTitle title={params.title}/>,
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
      onRefresh={onRefresh}
      refreshing={refreshing}
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

export default categoryIdPage