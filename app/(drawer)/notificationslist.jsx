import { StyleSheet, Text, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { fetchNotificationsList } from '../../api/services';
import { Link } from 'expo-router';
import CardLoader from '../../components/CardLoader';
import NotificationsCard from '../../components/NotificationsCard';

const notificationslist = () => {
  const notifications = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotificationsList
  })

  const RenderItem = ({url,title,id,image}) => {
    return (
      
 
      <NotificationsCard 
        key={id}
        title={title} 
        image={image}
        href={url}
      /> 
      
    )
  }

  if(notifications.isLoading){
    return (
      <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {[1,2,3,4,5,6,7,8,9,10].map(i=> 
                   <CardLoader key={i.toString()}/>
                   )}
      </SafeAreaView>
    )
  }

  if(notifications.isError){
    <SafeAreaView>
      <Text>Υπήρξε κάποιο πρόβλημα στην φόρτωση των δεδομένων ή ενδεχομένως να βρίσκεστε εκτός σύνδεσης. Παρακαλούμε προσπαθείστε εκ νέου.</Text>
    </SafeAreaView>
  }
  
  
  return(
    <SafeAreaView style={{paddingHorizontal:10}}>
      <FlatList 
      data={notifications.data.notifications}
      keyExtractor={item=>item.id.toString()}
      renderItem={({item})=>{
        return(        <RenderItem url={item.url} title={item.contents.en} image={item.big_image ? item.big_image : item.chrome_web_image } />
        )
      }}
      />
    
    </SafeAreaView>
  )
  
};

export default notificationslist

const styles = StyleSheet.create({})