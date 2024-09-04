import { View, Text, ActivityIndicator, ScrollView, StatusBar, StyleSheet, LogBox, SafeAreaView, RefreshControl, Platform, ImageBackground, Button, TouchableOpacity, Pressable } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import Drawer from 'expo-router/drawer'
import AnimatedLogoComponent from '../../components/AnimatedLogoComponent'
import { useHeaderHeight } from '@react-navigation/elements'
import { useMutation, useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCategories, fetchPosts } from '../../api/services'
import { useRouter } from 'expo-router'
import FeaturedCard from '../../components/FeaturedCard'
import Animated, {FadeIn,Easing} from 'react-native-reanimated'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CategoryButton from '../../components/CategoryButton'
import Feather from '@expo/vector-icons/Feather';
import CardLoader from '../../components/CardLoader'
import CardTitle from '../../components/CardTitle'
import FeaturedCardLoader from '../../components/FeaturedCardLoader'
import CategoryCard from '../../components/CategoryCard'

LogBox.ignoreLogs(['Support for defaultProps will be removed']);


const index = () => {

   //splash screen is hidden after the queries

  const headerHeight = useHeaderHeight()
  const router = useRouter()
  const [refreshing,setRefreshing] = useState(false)
  const queryclient = useQueryClient()
  const scrollViewRef = useRef(null);
  const [categoryTitle,setCategoryTitle] = useState('Volleyleague ανδρών')
  const queries = useQueries({
    queries: [
      {
        queryKey: ['featured'],
        queryFn: () => fetchPosts({ category: 467, perPage: 10 }),
        refetchInterval: 900000,
        refetchIntervalInBackground: true
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
    { data: featured, isLoading: isFeaturedLoading, error: featuredError, isFetching: isFeaturedFetching, refetch: refetch },
    { data: vlmen, isLoading: isVlmenLoading, error: vlmenError, isFetching: isVlmenFetching },
    { data: plmen, isLoading: isPlmenLoading, error: plmenError, isFetching: isPlmenFetching },
    { data: vlwmen, isLoading: isVlwmenLoading, error: vlwmenError, isFetching: isVlwmenFetching },
    { data: plwmen, isLoading: isPlwmenLoading, error: plwmenError, isFetching: isPlwmenFetching },
    { data: categories, isLoading: isCategoriesLoading, error: categoriesError, isFetching: isCategoriesFetching },
  ] = queries;
    
  
  const fetchAgain = useMutation({
    mutationFn:()=>fetchPosts({perPage:25}),
    onSuccess: (data)=> {
      queryclient.setQueryData(['posts'], data)
      setActiveIndex(0)
      setCategoryTitle('Volleyleague ανδρών')
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
       // Invalidate other queries to refetch them
       queryclient.invalidateQueries(['featured']);
       queryclient.invalidateQueries(['vlmen']);
       queryclient.invalidateQueries(['plmen']);
       queryclient.invalidateQueries(['vlwmen']);
       queryclient.invalidateQueries(['plwmen']);
       queryclient.invalidateQueries(['categories']);
       
    },
    onError: (error) => console.warn(error)
  })
  

  const onRefresh = useCallback(()=>{
    setRefreshing(true)
    fetchAgain.mutate()
    setRefreshing(false)
  },[])

  

  const initPosts = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts({ category:359,perPage: 25 })
  });
  
  const mutation = useMutation({
    mutationFn: ({ id }) => fetchPosts({ category: id, perPage: 25 }),
    onSuccess: (data) => {
      queryclient.setQueryData(['posts'], data); 
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    },
    onError: (error) => console.warn(error)
  });
   

  const isLoadingCards = mutation.isLoading  || mutation.isFetching || initPosts.isFetching || initPosts.isLoading;
  
  //here goes the code for the horizontal category menu
  const catScrollRef = useRef(null)
  const itemScrollRef = useRef([])
  const [activeIndex,setActiveIndex] = useState(0)
  const [categoriesAll,setCategoriesAll] = useState([])
  const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        fetchCategories().then(res => setCategoriesAll(res.data))
        setIsLoading(false)
    },[])

    const handleCategoryClick = async (id, title, index) => {
      setCategoryTitle(title);
      setActiveIndex(index);
      
      itemScrollRef.current[index]?.measureLayout(
        catScrollRef.current,
        (x, y, width, height) => {
          catScrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
        },
        error => {
          console.error('Measure layout error', error);
        }
      );
      
      await mutation.mutateAsync({ id });
      
    };

  if(featuredError || initPosts.isError){
    return (
      <ScrollView style={{marginTop:headerHeight,padding:10}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >   
        <Text style={{paddingHorizontal: 20,margin:10}}>Δεν υπάρχουν αποτελέσματα. Εδεχομένως να βρίσκεστε εκτός σύνδεσης</Text>
      </ScrollView>
    )
  }

  if(isFeaturedLoading || initPosts.isLoading || mutation.isLoading){
    return (
      <View style={{backgroundColor:'#000', minHeight:'100%', minWidth:'100%', flex:1, margin:0, padding:0}}>
      <Drawer.Screen options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#000'
          },
          }}
          />
      <ImageBackground style={{flex:1, minHeight:'100%', minWidth: '100%',justifyContent: 'flex-start'}} source={require('../../assets/splash.png')} resizeMode='cover'>
      <View style={{marginTop:'40%'}}>
        <Text style={{fontSize:20,color:'#fff',fontWeight:'bold', textAlign:'center'}}>Παρακαλώ περιμένετε...</Text>
        <ActivityIndicator size={24} color={'#fff'} />
      </View>
      </ImageBackground>
      </View>  
    )
  }
  return (
    <SafeAreaView style={{marginTop:headerHeight,padding:10}}>
    <Drawer.Screen options={{
        swipeEnabled: false,
        headerTransparent: true,
        headerTitle:() =><AnimatedLogoComponent/>,
        headerTitleAlign:'center',
        drawerLabel: 'Volleyland',
        headerRight: () => <TouchableOpacity style={{marginRight:10}} onPress={()=>fetchAgain.mutateAsync()}><MaterialCommunityIcons name='reload' size={24} color={'#000'} /></TouchableOpacity>
        }}
        />
     <View>
     <ScrollView
      ref={scrollViewRef} 
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
      <View style={styles.alternativeHorizontalCardAlt}>
       <View style={{flexDirection:'row', justifyContent:'space-between'}}>
     <Animated.View entering={FadeIn.duration(100).easing(Easing.ease)} style={{flexDirection:'row', justifyContent:'center',alignItems:'center',marginLeft:8}}>
     <MaterialCommunityIcons name="access-point" size={24} color="#000" />
     <Text style={{fontSize:24,fontWeight:'bold', marginLeft:10}}>Προτεινόμενα</Text>
     </Animated.View>
      <CategoryButton 
        viewstyles={styles.categoryViewAltΒ}
        textstyles={[styles.categoryText, Platform.OS == 'android' && { marginLeft:4,paddingRight:4}]}
        icon={<Feather name="target" size={20} color="#fff" />}
        onPress={()=>router.push('/newsfeed')}
        title={'Ροή Ειδήσεων'}
      />
        </View> 
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {
          isFeaturedFetching ?
                <FeaturedCardLoader/>   
          :
          featured?.map(p=>{
            return (
              <FeaturedCard
              key={p.id.toString()}
              title={p.title.rendered} 
              onPress={() => router.push(`/articles/${p.id}`)} 
              image={p.fimg_url} 
              views={p.post_views_count} 
              goToCategory={ (p.categories_names[0]==='Featured' && p.categories_names.length > 1) ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
              category={(p.categories_names[0]==='Featured' && p.categories_names.length > 1) ? p.categories_names[1] : 'Διάφορα' } 
              thedate={p.date}
              thetime={p.date}
              author={p.author_name}
            />
          
            )
          })
        }
          </ScrollView>
              </View>
        { 
        isLoadingCards ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
            <View style={{}}>
                    <CardTitle />
                  {[1,2,3,4,5,6,7,8,9,10].map(i=> 
                   <CardLoader key={i.toString()}/>
                   )}
            </View>
          </View>
        ) : 
        
        (
          <View>
        <Animated.View entering={FadeIn.duration(100).easing(Easing.ease)} style={{flexDirection:'row', justifyContent:'center', alignItems:'center',marginBottom:10}}>          
        <MaterialCommunityIcons name="volleyball" size={24} color="#000" />
        <Text style={{fontSize:24,fontWeight:'bold', marginLeft:10}}>{categoryTitle}</Text>
          </Animated.View>     
             
              { 
              initPosts.data?.map((p)=> {return (
                
                
                <CategoryCard 
                     key={p.id.toString()}
                     title={p.title.rendered} 
                     onPress={() => router.push(`/articles/${p.id}`)} 
                     image={p.fimg_url} 
                     views={p.post_views_count} 
                     goToCategory={ (p.categories_names[0]==='Featured' && p.categories_names.length > 1) ? ()=> router.push(`categories/${p.categories[1]}?title=${p.categories_names[1]}`) : ()=> router.push(`categories/${p.categories[0]}?title=Διάφορα`)} 
                     category={(p.categories_names[0]==='Featured' && p.categories_names.length > 1) ? p.categories_names[1] : 'Διάφορα' } 
                     thedate={p.date}
                     thetime={p.date}
                     author={p.author_name}
                     isLoading={isLoadingCards}
                     /> 
                    

                     
           )})
            }
          </View>
          )}
          </ScrollView>
      </View>  
      {initPosts.isFetching ? null :   
      <View style={styles.categoryBar}>
      <View style={{justifyContent:'center', alignItems:'center',alignContent:'center'}}>
      <Feather name="arrow-down-circle" size={12} color="black" /><Text style={styles.bottomBarTitle}>Επιλέξετε Κατηγορία</Text>
      </View>
      <ScrollView ref={catScrollRef} horizontal contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingleft:20, paddingRight:30}} showsHorizontalScrollIndicator={false} >
        { categoriesAll.map((c,index)=>
        <Pressable ref={el => { itemScrollRef.current[index] = el }} style={
          [
            styles.bottomBarItem,
            {backgroundColor: activeIndex === index ? "#000" : "#fff"}
          ]
        }
        onPress={() => handleCategoryClick(c.id,c.title,index)} key={index}
        >
          <Text style={{color: activeIndex === index ? "#fff" : "#000"}}>{c.title}</Text> 
        </Pressable>)}
       </ScrollView>
      </View>
      }
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
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17

    },

    alternativeHorizontalCard: {
      backgroundColor:'#000',
      paddingVertical: 20,
      marginVertical: 10
    },

    alternativeHorizontalCardAlt: {
      
      paddingBottom: 10,
      paddingTop: 10,
      marginVertical: 4
    },
    categoryBar: {
      height: 120,
      gap:10,
      backgroundColor:'#fff', 
      paddingVertical:8,
      paddingBottom: Platform.OS==='ios' && 20,
      position: 'absolute',
      bottom:0,
      right:0,
      left:0,
      zIndex:99999,
      paddingLeft:20,
      paddingRight:40,
      borderTopLeftRadius:25,
      borderTopRightRadius:25, 
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      elevation: 1,
    },
    bottomBarItem:{
      marginHorizontal:4, 
      borderWidth:0.5, 
      borderColor:"#ccc", 
      padding: 6, 
      borderRadius:5,
    },
    bottomBarTitle: {
      fontSize: 12,
      fontWeight:'bold',
      textAlign: 'center',
      marginTop:10
    }
 
})