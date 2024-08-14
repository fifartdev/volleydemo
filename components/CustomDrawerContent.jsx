import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useGlobalSearchParams, useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetchCategories } from '../api/services'
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet, View } from "react-native";



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
            labelStyle={styles.homeLabel} label={({ focused, color }) => (
                <Text style={[styles.label, { color: focused ? 'blue' : color }]}>
                  Αρχική
                </Text>
              )} onPress={()=>router.push('/')}
               icon={({focused,size,color}) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }
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
                        color={color}
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
        labelStyle={styles.homeLabel} label={({ focused, color }) => (
            <Text style={[styles.label, { color: focused ? 'blue' : color }]}>
              Αρχική
            </Text>
          )} onPress={()=>router.push('/')}
           icon={({focused,size,color}) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }
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
        color: 'black',
    },
    // homeLabel: {
    //     marginLeft: -20
    // },
    // label:{
    //     marginLeft: -20
    // },
})