import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const categoriesMenu = [
    {
      
      "title":"Όλα"
    },
    {
      "id":359,
      "title":"Voleyleague Ανδρών"
    },
    {
      "id":502,
      "title":"Pre-league Ανδρών"
    },
    {
      "id":74,
      "title":"Voleyleague Γυναικών"
    },
    {
      "id":70,
      "title":"Pre-league Γυναικών"
    },
  ]


const CategoryListButtons = ({onPress}) => {
  return (
    <>
    <ScrollView horizontal contentContainerStyle={{justifyContent:'center',alignItems:'center',paddingleft:20, paddingRight:30}} showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
    { categoriesMenu.map((c,index)=><Text style={{marginHorizontal:4, borderWidth:0.5, borderColor:"#ccc", padding: 6, borderRadius:5}} onPress={onPress} key={index+1}>{c.title}</Text>) }
   </ScrollView>
    </>
  )
}

export default CategoryListButtons

const styles = StyleSheet.create({})