import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function mainLayout(){
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
            drawerContent={CustomDrawerContent} 
            screenOptions={{
                drawerHideStatusBarOnOpen: true,
            }}
            >
            
            </Drawer>
            
        </GestureHandlerRootView>
    )
}