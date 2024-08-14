import { Stack } from "expo-router";
import AnimatedLogoComponent from "../components/AnimatedLogoComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {

  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
    <Stack> 
      <Stack.Screen name="index" options={{
        headerTitle:()=><AnimatedLogoComponent/>
        }} />
      <Stack.Screen name="profile" options={{title:"Profile"}} />
      <Stack.Screen name="details" options={{
        title:"Details",
        }}/>
      <Stack.Screen name="(drawer)" options={{headerShown:false, title:'Home'}} />
    </Stack>    
    </QueryClientProvider>
  );
}
