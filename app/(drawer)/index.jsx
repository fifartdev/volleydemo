import { View, Text, ActivityIndicator, SectionList, StatusBar, StyleSheet, LogBox } from 'react-native'
import React from 'react'
import Drawer from 'expo-router/drawer'
import AnimatedLogoComponent from '../../components/AnimatedLogoComponent'
import { useHeaderHeight } from '@react-navigation/elements'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchPosts } from '../../api/services'
import Card from '../../components/Card'
import HorizontalList from '../../components/HorizontalList'
import { useRouter } from 'expo-router'

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

const index = () => {
  const headerHeight = useHeaderHeight()
  const date = (d) => { return new Date(d).toLocaleDateString('el-GR')}
  const router = useRouter()

  const featured = useQuery({ 
    queryKey: ['featured'], 
    queryFn: ()=>fetchPosts({category:467,perPage:10}), 
  }
)
  const vlmen = useQuery({ 
    queryKey: ['vlmen'], queryFn: ()=>fetchPosts({category:359,perPage:6}),   
  }
)
const plmen = useQuery({ 
  queryKey: ['vlmen'], queryFn: ()=>fetchPosts({category:502,perPage:6}),   
}
)
  const vlwmen = useQuery({ 
  queryKey: ['vlwmen'], queryFn: ()=>fetchPosts({category:74,perPage:6}),   
}
) 
const plwmen = useQuery({ 
  queryKey: ['vlwmen'], queryFn: ()=>fetchPosts({category:70,perPage:6}),   
}
) 

  const getCats = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories()
  })

  const sections = [
    {
      data: featured.data,
      horizontal: false,
      title: 'Επικαιρότητα'
    },
    {
      data: vlmen.data,
      horizontal: true,
      title: 'Volleyleague Ανδρών'
    },
    {
      data: vlwmen.data,
      horizontal: false,
      title: 'Volleyleague Γυναικών'
    },
    {
      data: plmen.data,
      horizontal: true,
      title: 'Preleague Ανδρών'
    },
    {
      data: plwmen.data,
      horizontal: false,
      title: 'Preleague Γυναικών'
    },

  ]
  //console.log('RES: ', getCats.data)

  if(getCats.isError){
    return (
      <View style={{marginTop:headerHeight,padding:10}}>
    <Drawer.Screen options={{
        headerTransparent: true,
        headerTitle:() =><AnimatedLogoComponent/>,
        headerTitleAlign:'center'
        }}
        
        
        />

      <Text>Home</Text>
      <Text>There is an error on the request</Text>
      </View>
    )
  }

  if(getCats.isFetching || featured.isFetching || vlmen.isFetching || vlwmen.isFetching ){
    return (
      <View style={{marginTop:headerHeight,padding:10}}>
      <Drawer.Screen options={{
          headerTransparent: true,
          headerTitle:() =><AnimatedLogoComponent/>,
          headerTitleAlign:'center',
          }}
          
          />
      <ActivityIndicator size={24} color={'blue'} />  
      </View>  
    )
  }


  return (
    <View style={{marginTop:headerHeight,padding:10}}>
    <Drawer.Screen options={{
        headerTransparent: true,
        headerTitle:() =><AnimatedLogoComponent/>,
        headerTitleAlign:'center'
        }}
        />
        <SectionList
          stickySectionHeadersEnabled
          sections={sections}
          keyExtractor={(item, index) => item.title + index.toString()}
          renderSectionHeader={({ section }) => (
            <>
              <View style={styles.titleHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              {section.horizontal && <HorizontalList data={section.data} />}
            </>
          )}
          renderItem={({ item, section }) => (
            !section.horizontal ? (
              <Card 
              title={item.title.rendered} 
              onPress={() => console.log(item.id)} 
              image={item.fimg_url} 
              views={item.post_views_count} 
              goToCategory={ item.categories_names[0]==='Featured' ? ()=> router.push(`categories/${item.categories[1]}?title=${item.categories_names[1]}`) : ()=> router.push(`categories/${item.categories[0]}?title=Διάφορα`)} 
              category={item.categories_names[0]==='Featured' ? item.categories_names[1] : 'Διάφορα' } />
            ) : null
          )}
         />
      <StatusBar style="auto" />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  titleHeader:{
    paddingVertical: 8,
    backgroundColor: '#2b72b9'
  },
  sectionTitle: {
    color: '#fff',
    paddingHorizontal: 6,
    fontSize: 16,
    fontWeight:'bold',
  }
})