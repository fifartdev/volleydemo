import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { getPostIds, initializeStorage, removeAllPostIds } from '../../utilities/asyncStorage'
import { useQueries, useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { fetchPost } from '../../api/services'
import { Drawer } from 'expo-router/drawer'
import IconButton from '../../components/IconButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '../../components/Card'


export default function readingList() {
  const date = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const router = useRouter()
  useEffect(()=>{
    initializeStorage()
},[])
    
  const query = useQuery({
    queryKey: ['postIds'],
    queryFn: getPostIds
  })

  const postIds = query?.data
  const integerPostIds = postIds?.map(str => parseInt(str, 10)) || [];
  
const postQueries = useQueries({
    queries:integerPostIds.map((id) => {
        return {
          queryKey: ['post', id],
          queryFn: () => fetchPost(id),
        };
      })
} 
    
  );

// HERE STARTS THE REMOVE FAV MUTATION
const queryClient = useQueryClient()

const removeAllPostIdMutation = useMutation(
    {
      mutationFn: removeAllPostIds,
      onSuccess: () => {
        console.log('Mutation successful, invalidating queries...');
        queryClient.invalidateQueries(['postIds']);
      },
      onError: (error) => {
        console.error('Mutation failed', error);
      },
    }
  );
const handleRemoveAllPostIds= async () => {
    console.log(`Removing all post IDs`);
    try {
      await removeAllPostIdMutation.mutateAsync();
      console.log('Post IDs removed successfully');
    } catch (error) {
      console.error('Error removing post IDs', error);
    }
  }

  const alertOnRemove = () =>
    Alert.alert('Είστε σίγουροι;', 'Ολόκληρη η λίστα σας, θα αδειάσει!', [
      {
        text: 'Ακύρωση',
        onPress: () => console.log('Ακυρώθηκε'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        handleRemoveAllPostIds()
        router.back()
    }},
    ]);
// HERE END THE REMOVE FAV MUTATION

//   console.log(integerPostIds);
//   console.log(postQueries.map(q=>q.data));
  

  if (postQueries.some((query) => query.isLoading)) {
    return (
      <SafeAreaView>
        <Drawer.Screen options={{
        headerTitle: 'Διαβάστε Αργότερα',
        headerTitleAlign: 'center',
        headerRight:()=><IconButton onPress={()=>alertOnRemove()} icon={<Ionicons name="trash-bin-sharp" size={24} color="#2b72b9" style={{marginRight:10}} />}/>}} 
        />
        <ActivityIndicator size="small" color="blue" />
      </SafeAreaView>
    );
  }

  if (postQueries.some((query) => query.isError)) {
    return (
      <SafeAreaView>
        <Text>Σφάλμα. Δεν υπάρχουν αποτελέσματα.Ίσως βρίσκεστε εκτός σύνδεσης</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Drawer.Screen options={{
        headerTitle: 'Διαβάστε Αργότερα',
        headerTitleAlign: 'center',
        headerRight:()=><IconButton onPress={()=>alertOnRemove()} icon={<Ionicons name="trash-bin-sharp" size={24} color="#2b72b9" style={{marginRight:10}} />}/>}} />
      <FlatList
      showsVerticalScrollIndicator={false}
      data={postQueries.map(query => query.data)}
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
    paddingHorizontal:10
  }
})
    