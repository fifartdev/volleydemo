import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Image, Platform } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState, memo } from "react";
import he from 'he'
import Feather from '@expo/vector-icons/Feather';

const Card = ({ title, onPress, image, views, category, goToCategory, thetime, thedate,author }) => {

    const [theTitle,setTheTitle]=useState()
    const postDate = (d) => { return new Date(d).toLocaleDateString('el-GR')}
    const postTime = (d) => { return new Date(d).toLocaleTimeString('el-GR')}
    useEffect(()=>{
      const decoded = he.decode(title)
      setTheTitle(decoded)
    },[])


    return (
      <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
        <View style={styles.imageContainer}>
        <Image source={
          image ? {uri:image} : require('../assets/volleyland_logo.png')
        } style={styles.cardImage} />
        <View style={styles.viewsContainer}>
             <Ionicons name="eye" size={14} color="#fff" /><Text style={styles.cardViews}>{views}</Text>
        </View>
        </View>
        <View style={{flex:1}}>
            <View style={styles.metaContainer}>
            <View style={styles.categoryContainer}>
                <Text onPress={goToCategory} style={styles.categoryTitle}>{category}</Text>
            </View>
            </View>
        <Text style={styles.cardTitle}>{theTitle}</Text>
        <View style={styles.metaBox}>
          <View style={styles.metaTopLine}></View>
          <Text style={styles.meta}><Ionicons name="calendar" size={10} color="#fff" /> {postDate(thedate)} {postTime(thetime)}</Text>
          <Text style={styles.author}><Feather name="pen-tool" size={10} color="#fff" /> {author}</Text>
          <View style={styles.metaBottomLine}></View>
        </View>
        </View>
      </TouchableOpacity>
    );
  };

  export default memo(Card)

  const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 4,
        padding: 5,
        width: Dimensions.get("screen").width - 10,
        maxWidth: Dimensions.get("screen").width - 10,
        height: 160,
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
        elevation:3
      },
      cardTitle: {
        backgroundColor: '#2b72b9',
        position: 'absolute',
        left: -20,
        top: 26,
        fontSize: 12, 
        fontWeight:'bold', 
        color: '#fff', 
        padding: 10 
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
        top: 2,
        left: 0,
        position: 'absolute'
      },
      cardViews: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 10,
      },
      cardImage: {
        width: '100%',
        height: '100%'
      },
      categoryContainer:{
        marginLeft: 4,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        backgroundColor: 'lightgrey'
      },
      metaContainer: {
        flex:1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position:'absolute',
        top: 2,
      },
      categoryTitle: {
        maxWidth: '100%',
        fontSize: 10
      },
      imageContainer: {
        flex:1,
        position: 'relative'
      },
      metaBox: {
        position:'absolute',
        bottom:0,
        right:0,
        paddingLeft: 20,
        borderTopStartRadius:5,
        paddingVertical:4,
        marginRight: Platform.OS === 'android' ? 25 : 10
      },
      meta: {
        color: '#444',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
      },
      author: {
        color:'#444',
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right'
      },
      metaTopLine: {
        height:1,
        width: '80%',
        backgroundColor: "#ccc",
        position: 'absolute',
        right: 0
      },
      metaBottomLine: {
        height:1,
        width: '100%',
        backgroundColor: "#ccc",
        position: 'absolute',
        right: 0,
        bottom:0
      }
  })