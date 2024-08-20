import { View, Text, ActivityIndicator, ScrollView, StatusBar, StyleSheet, LogBox, SafeAreaView, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import Drawer from 'expo-router/drawer'
import AnimatedLogoComponent from '../../components/AnimatedLogoComponent'
import { useHeaderHeight } from '@react-navigation/elements'
import { useQuery, useQueries } from '@tanstack/react-query'
import { fetchCategories, fetchPosts } from '../../api/services'
import Card from '../../components/Card'
import { useRouter } from 'expo-router'
import FeaturedCard from '../../components/FeaturedCard'
import Animated, {FadeIn,Easing} from 'react-native-reanimated'
import CategoryTitle from '../../components/CategoryTitle'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CategoryButton from '../../components/CategoryButton'
import Feather from '@expo/vector-icons/Feather';

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

const index = () => {
  const headerHeight = useHeaderHeight()
  const date = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const router = useRouter()
  const [refreshing,setRefreshing] = useState(false)

  const queries = useQueries({
    queries: [
      {
        queryKey: ['featured'],
        queryFn: () => fetchPosts({ category: 467, perPage: 10 }),
      },
      {
        queryKey: ['vlmen'],
        queryFn: () => fetchPosts({ category: 359, perPage: 6 }),
      },
      {
        queryKey: ['plmen'],
        queryFn: () => fetchPosts({ category: 502, perPage: 6 }),
      },
      {
        queryKey: ['vlwmen'],
        queryFn: () => fetchPosts({ category: 74, perPage: 6 }),
      },
      {
        queryKey: ['plwmen'],
        queryFn: () => fetchPosts({ category: 70, perPage: 6 }),
      },
      {
        queryKey: ['categories'],
        queryFn: () => fetchCategories(),
      },
    ] 
  })

  const [
    { data: featured, isLoading: isFeaturedLoading, error: featuredError, isFetching: isFeaturedFetching },
    { data: vlmen, isLoading: isVlmenLoading, error: vlmenError, isFetching: isVlmenFetching },
    { data: plmen, isLoading: isPlmenLoading, error: plmenError, isFetching: isPlmenFetching },
    { data: vlwmen, isLoading: isVlwmenLoading, error: vlwmenError, isFetching: isVlwmenFetching },
    { data: plwmen, isLoading: isPlwmenLoading, error: plwmenError, isFetching: isPlwmenFetching },
    { data: categories, isLoading: isCategoriesLoading, error: categoriesError, isFetching: isCategoriesFetching },
  ] = queries;
  

  const { refetch } = useQuery({
    queryKey:['posts'],
    queryFn: fetchPosts
  })

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  },[])

  if(featuredError || vlmenError || vlwmenError || plmenError || plwmenError){
    return (
      <View style={{marginTop:headerHeight,padding:10}}>
    <Drawer.Screen options={{
        headerTransparent: true,
        headerTitle:() =><AnimatedLogoComponent/>,
        headerTitleAlign:'center'
        }}
        
        
        />     
        <Text>Δεν υπάρχουν αποτελέσματα. Εδεχομένως να βρίσκεστε εκτός σύνδεσης</Text>
      </View>
    )
  }

  if(isFeaturedFetching||isVlmenFetching||isVlwmenFetching||isPlmenFetching||isPlwmenFetching){
    return (
      <View style={{marginTop:headerHeight,padding:10}}>
      <Drawer.Screen options={{
          headerTransparent: true,
          headerTitle:() =><AnimatedLogoComponent/>,
          headerTitleAlign:'center',
          }}
          
          />
      <ActivityIndicator size={24} color={'#000'} />  
      </View>  
    )
  }
  return (
    <SafeAreaView style={{marginTop:headerHeight,padding:10}}>
    <Drawer.Screen options={{
        headerTransparent: true,
        headerTitle:() =><AnimatedLogoComponent/>,
        headerTitleAlign:'center',
        }}
        />
     <Animated.View entering={FadeIn.duration(500).easing(Easing.ease)}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
      <View style={styles.alternativeHorizontalCardAlt}>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
      <CategoryTitle title={'Τελευταίες Ειδήσεις'} 
        viewstyles={styles.categoryViewAltD}
        textstyles={styles.categoryText}
        icon={<MaterialCommunityIcons name="volleyball" size={20} color="#fff" />}
        />
      <CategoryButton
        title={'Ροή Ειδήσεων'} 
        viewstyles={styles.categoryViewAltΒ}
        textstyles={styles.categoryText}
        icon={<Feather name="target" size={20} color="#fff" />}
        onPress={()=>router.push('/newsfeed')}

      />
        </View> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {
          featured?.map(p=>{
            return (
              <FeaturedCard
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ p.categories_names[0]==='Featured' ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={p.categories_names[0]==='Featured' ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
            />
          
            )
          })
        }
          </ScrollView>
              </View>
        <CategoryTitle title={'Volleyleague Γυναίκες'} 
        viewstyles={styles.categoryView}
        textstyles={styles.categoryText}
        icon={<MaterialCommunityIcons name="volleyball" size={20} color="#fff" />}
        />
        {
          vlwmen?.map(p=>{
            return (
              <Card 
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ p.categories_names[0]==='Featured' ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={p.categories_names[0]==='Featured' ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
              />
            
            )
          })
        }
        <CategoryTitle title={'Volleyleague Άνδρες'} 
        viewstyles={styles.categoryViewAlt}
        textstyles={styles.categoryText}
        icon={<MaterialCommunityIcons name="volleyball" size={20} color="#fff" />}
        />
        {
          vlmen?.map(p=>{
            return (
              <Card 
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ p.categories_names[0]==='Featured' ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={p.categories_names[0]==='Featured' ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
              />
          
            )
          })
        }
        <View style={styles.alternativeHorizontalCard}>
        <CategoryTitle title={'Pre-league Άνδρες'} 
        viewstyles={styles.categoryViewAltC}
        textstyles={styles.categoryText}
        icon={<MaterialCommunityIcons name="volleyball" size={20} color="#fff" />}
        />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          plmen?.map(p=>{
            return (
              <FeaturedCard
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ p.categories_names[0]==='Featured' ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={p.categories_names[0]==='Featured' ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
              />
          
            )
          })
        }
      </ScrollView>
        </View>
        <CategoryTitle title={'Pre-league Γυναίκες'} 
        viewstyles={styles.categoryViewAlt}
        textstyles={styles.categoryText}
        icon={<MaterialCommunityIcons name="volleyball" size={20} color="#fff" />}
        />
        {
          plwmen.map(p=>{
            return (
              <Card 
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ p.categories_names[0]==='Featured' ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={p.categories_names[0]==='Featured' ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
              />
          
            )
          })
        }
      </ScrollView>       
      </Animated.View>    
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({

  categoryView: {
    backgroundColor:'#2b72b9',
        margin:10,
        padding:4,
        width:'60%',
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
  },
  categoryViewAlt: {
    backgroundColor:'#6091af',
        margin:10,
        padding:4,
        width:'60%',
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        marginLeft: '39%',
        justifyContent:'center',
        alignItems:'center',
  },
  categoryViewAltΒ: {
        flex:1,
        backgroundColor:'#be232d',
        margin:10,
        padding:4,
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        justifyContent:'center',
        alignItems:'center',
  },
  categoryViewAltC: {
    backgroundColor:'#000',
        margin:10,
        padding:4,
        width:'60%',
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        justifyContent:'center',
        alignItems:'center',
  },
  categoryViewAltD: {
        flex:2,
        width:'100%',
        backgroundColor:'#000',
        margin:10,
        padding:4,
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        justifyContent:'center',
        alignItems:'center',
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17

    },

    alternativeHorizontalCard: {
      backgroundColor:'#2b72b9',
      paddingVertical: 20,
      marginVertical: 10
    },

    alternativeHorizontalCardAlt: {
      backgroundColor:'#b5d6f7',
      paddingBottom: 20,
      paddingTop: 10,
      marginVertical: 10
    }
  
 
})