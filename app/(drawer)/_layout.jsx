import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawerContent";

export default function mainLayout(){
    return (
            <Drawer 
            drawerContent={CustomDrawerContent} 
            screenOptions={{
                drawerHideStatusBarOnOpen: true,
            }}
            >
            
            </Drawer>
    )
}