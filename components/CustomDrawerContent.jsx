import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useGlobalSearchParams, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetchCategories } from '../api/services'
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function CustomDrawerContent(props){
    const router = useRouter()
    const [categories,setCategories] = useState([])
    const [isLoading,setIsLoading] = useState(false)


    useEffect(()=>{
        setIsLoading(true)
        fetchCategories().then(res => setCategories(res.data))
        setIsLoading(false)
    },[])
   // console.log('DATA are: ',categories);

if(!categories){
    return (
        <DrawerContentScrollView 
        {...props}
        contentContainerStyle={{
        }}
        >
            <DrawerItem
            labelStyle={styles.label} label={({ focused, color }) => (
                <Text style={[styles.label, { color: focused ? 'blue' : color }]}>
                  Volleyland
                </Text>
              )} onPress={()=>router.push('/')}
               icon={({focused,size,color}) => <FontAwesome5 name="volleyball-ball" size={size} color={'#2b72b9'} /> }
               />
            <DrawerItem
                labelStyle={styles.label} label={({ focused, color }) => (
                    <Text style={[styles.label, { color: focused ? 'blue' : color }]}>
                      Reading List
                    </Text>
                  )} onPress={()=>router.push('/(drawer/readinglist')}
                   icon={({focused,size,color}) => <Ionicons name={'bookmark'} size={size} color={'#2b72b9'} /> }
                   />
            <Text style={{alignSelf:'center'}}>Ενδεχομένως να είστε εκτός σύνδεσης.</Text>        
            <DrawerItem  label={'Όροι Χρήσης'} />
            <DrawerItem  label={'Σχετικά με εμάς'} />
            {/* <DrawerItemList {...props}/> */}
        </DrawerContentScrollView>
           
    )
}

const CustomDrawerItem = ({ focused, color, size, label, onPress }) => {
    return (
        <View style={[styles.container]}>
            <DrawerItem
                icon={({ focused, color, size }) => (
                    <Ionicons
                        name='add-outline'
                        size={size}
                        color={'#2b72b9'}
                    />
                )}
                label={label}
                labelStyle={styles.label}
                onPress={onPress}
                
            />
        </View>
    );
};
   
return (
    <DrawerContentScrollView 
    {...props}
    contentContainerStyle={{
    }}
    >
        <DrawerItem
        labelStyle={styles.label}
        label={'Volleyland'}
        onPress={()=>router.push('/')}
           icon={({focused,size,color}) => <FontAwesome5 name="volleyball-ball" size={size} color={'#2b72b9'} /> }
           />
        <DrawerItem 
                labelStyle={styles.label}
                label={'Reading List'}
                onPress={()=>router.push('/readinglist')}
                   icon={({focused,size,color}) => <Ionicons name={'bookmarks-outline'} size={size} color={'#2b72b9'} /> }
                   />
        {isLoading ? <ActivityIndicator size={14} color={'blue'}/> : 
        categories?.map((c) => (
            <CustomDrawerItem
            key={c.id}
    label={c.title}
    onPress={() => {
        router.push(`categories/${c.id}?title=${c.title}`);
    }}
/>
              
        )
            
        )}
        <DrawerItem  label={'Όροι Χρήσης'} />
        <DrawerItem  label={'Σχετικά με εμάς'} />
        {/* <DrawerItemList {...props}/> */}
    </DrawerContentScrollView>
)
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
        paddingVertical: 10,
 
    },
    label: {
        color: '#2b72b9',
    },
    // homeLabel: {
    //     marginLeft: -20
    // },
    // label:{
    //     marginLeft: -20
    // },
})