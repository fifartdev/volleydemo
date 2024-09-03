import { Stack } from "expo-router";
import AnimatedLogoComponent from "../components/AnimatedLogoComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {

  const queryClient = new QueryClient()
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
    <Stack> 
      <Stack.Screen name="index" options={{
        headerTitle:()=><AnimatedLogoComponent/>
        }} />
      <Stack.Screen name="profile" options={{title:"Profile"}} />
      <Stack.Screen name="newsfeed" options={{
        title:"Ροή Ειδήσεων",
        }}/>
      <Stack.Screen name="(drawer)" options={{headerShown:false, title:'Αρχική'}} />
      <Stack.Screen name="categories/[categoryId]"  
      options={{
        headerBackTitle:'Πίσω'
      }}
      />
    </Stack>    
    </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
