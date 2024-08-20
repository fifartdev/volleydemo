import { TouchableOpacity, Text, StyleSheet, Dimensions, View, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState, memo } from "react";
import he from 'he'

const FeaturedCard = ({ title, thedate,thetime,author, onPress, image, views, category, goToCategory }) => {
  
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
        <View style={styles.categoryContainer}>
                <Text onPress={goToCategory} style={styles.categoryTitle}>{category}</Text>
            </View>
        </View>
            <View style={styles.metaContainer}>            
        <Text style={styles.cardTitle}>{theTitle}</Text>
        <View style={{height:1,width:'20%',backgroundColor:'#fff',marginVertical:4,alignSelf:'center'}}></View>
        <Text style={styles.date}>{postDate(thedate)} {postTime(thetime)}</Text>
        <Text style={styles.author}>{author}</Text>
            </View>
      </TouchableOpacity>
    );
  };

  export default memo(FeaturedCard)

  const styles = StyleSheet.create({
    cardContainer: {
        flexDirection:'column',
        marginHorizontal: 6,
        marginVertical: 4,
        padding: 5,
        width: Dimensions.get("screen").width / 2,
        maxWidth: Dimensions.get("screen").width / 2,
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
        fontSize: 12,
        color: '#fff',
        marginLeft: 10,
      },
      cardImage: {
        width: '100%',
        height: 200
      },
      categoryContainer:{
        margin: 4,
        height: 20,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 2,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        top:2,
        left: 0,
        opacity: 0.9
      },
      metaContainer: {
        flex:1,
        justifyContent: 'center',
        top:10,
        alignContent:'center',
        backgroundColor:'#2b72b9',
        margin:20
      },
      cardTitle: {
        backgroundColor: '#2b72b9',
        fontSize: 12, 
        fontWeight:'bold', 
        color: '#fff', 
        padding: 4,
        alignSelf: 'center',
        textAlign: 'center' 
      },
      date:{
        color:'#fff',
        fontSize:'10',
        fontWeight:'bold',
        textAlign:'center',
      },
      author:{
        color:'#fff',
        fontSize:'10',
        fontWeight:'bold',
        textAlign:'center',
      },
      categoryTitle: {
        maxWidth: '100%',
        fontSize: 10,
        alignSelf:'center',
        alignContent:'center'
      },
      imageContainer: {
        flex:1,
        height: 220
      }
  })