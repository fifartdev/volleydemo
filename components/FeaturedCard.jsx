import { Pressable, Text, StyleSheet, Dimensions, View, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState, memo } from "react";
import he from 'he'
import Feather from '@expo/vector-icons/Feather'

const FeaturedCard = ({ title, thedate,thetime,author, onPress, image, views, category, goToCategory }) => {
  
    const [theTitle,setTheTitle]=useState()
    const postDate = (d) => { return new Date(d).toLocaleDateString('el-GR')}
    const postTime = (d) => { return new Date(d).toLocaleTimeString('el-GR')}

    useEffect(()=>{
      const decoded = he.decode(title)
      setTheTitle(decoded)
    },[])


    return (
      <Pressable onPress={onPress} style={styles.cardContainer}>
        <View style={styles.imageContainer}>
        <Image source={
          image ? {uri:image} : require('../assets/volleyland_logo.png')
        } style={styles.cardImage} />
        <View style={styles.viewsContainer}>
             <Ionicons name="eye" size={14} color="#fff" /><Text style={styles.cardViews}>{views}</Text>
        </View>
        <View style={styles.categoryContainer}>
                <Text onPress={goToCategory} style={styles.categoryTitle}>#{category}</Text>
            </View>
        </View>
            <View style={styles.metaContainer}>            
        <Text style={styles.cardTitle}>{theTitle}</Text>
        <View style={{height:1,width:'20%',backgroundColor:'#444444',marginVertical:4,alignSelf:'center'}}></View>
        { thedate && <Text style={styles.date}><Feather name="calendar" size={10} color="#444" /> {postDate(thedate)} {postTime(thetime)}</Text>}
        <Text style={styles.author}> <Feather name="pen-tool" size={10} color="#444" /> {author}</Text>
            </View>
      </Pressable>
    );
  };

  export default memo(FeaturedCard)

  const styles = StyleSheet.create({
    cardContainer: {
        flexDirection:'column',
        marginHorizontal: 6,
        marginVertical: 4,
        padding: 5,
        width: Dimensions.get("screen").width / 1.7,
        maxWidth: Dimensions.get("screen").width / 1.7,
        height: 260,
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#fff",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        elevation: 4
      },
      cardCategory: {
        fontSize: 12,
      },
      viewsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
        backgroundColor:'black',
        opacity:0.8,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        top: 32,
        left: 0,
        position: 'absolute'
      },
      cardViews: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
      },
      cardImage: {
        width: '100%',
        height: 200
      },
      categoryContainer:{
        margin: 3,
        height: 24,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        backgroundColor: '#fff',
        position: 'absolute',
        top:2,
        left: 0,
        opacity: 0.9,
        justifyContent:'center',
        alignItems:'center',
        flex:1
      },
      metaContainer: {
        padding:4,
        justifyContent: 'center',
        top:10,
        alignContent:'center',
        backgroundColor:'#fff',
        opacity:0.9,
        margin:20,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#fff",
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.1,
        elevation:2
      },
      cardTitle: {
        fontSize: 14, 
        fontWeight:'bold', 
        color: '#444444', 
        padding: 4,
        alignSelf: 'center',
        textAlign: 'center' 
      },
      date:{
        color:'#444444',
        fontSize:11,
        fontWeight:'bold',
        textAlign:'center',
      },
      author:{
        color:'#444444',
        fontSize:11,
        fontWeight:'bold',
        textAlign:'center',
      },
      categoryTitle: {
        maxWidth: '100%',
        fontSize: 14,
        alignSelf:'center',
        alignContent:'center',
        letterSpacing:-0.5,
        fontWeight:'bold',
      },
      imageContainer: {
        flex:1,
        height: 220
      }
  })