import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import AnimatedLogoComponent from "../../components/AnimatedLogoComponent";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function mainLayout(){
    return (
            <Drawer 
            screenOptions={{
                drawerHideStatusBarOnOpen: true,
                drawerPosition:'right',
                headerTintColor:'#000'
            }}
            >
                <Drawer.Screen 
                name="index"
                options={{
                    headerTitle:() =><AnimatedLogoComponent/>,
                    headerTitleAlign:'center',
                    drawerLabel: 'Volleyland',
                    drawerLabelStyle: {
                        color:'#2b72b9'
                    },
                    drawerIcon: ()=><FontAwesome5 name={'volleyball-ball'} size={20} color={'#2b72b9'} />
                }}
                />
                <Drawer.Screen 
                name="readinglist"
                options={{
                    headerTitle:'Διαβάστε Αργότερα',
                    headerTitleAlign:'center',
                    drawerLabel: 'Διαβάστε Αργότερα',
                    drawerLabelStyle: {
                        color:'#2b72b9'
                    },
                    drawerIcon: ()=><FontAwesome5 name={'bookmark'} size={20} color={'#2b72b9'} />
                }}
                />
                <Drawer.Screen 
                name="notificationslist"
                options={{
                    headerTitle:'Ειδοποιήσεις',
                    headerTitleAlign:'center',
                    drawerLabel: 'Ειδοποιήσεις',
                    drawerLabelStyle: {
                        color:'#2b72b9'
                    },
                    drawerIcon: ()=><FontAwesome5 name={'bell'} size={20} color={'#2b72b9'} />
                }}
                />
                <Drawer.Screen 
                name="settings"
                options={{
                    headerTitle:'Ρυθμίσεις',
                    headerTitleAlign:'center',
                    drawerLabel: 'Ρυθμίσεις',
                    drawerLabelStyle: {
                        color:'#2b72b9'
                    },
                    drawerIcon: ()=><Ionicons name={'settings-sharp'} size={20} color={'#2b72b9'} />
                }}
                />
                <Drawer.Screen 
                name="althome"
                options={{
                    headerTitle:'Alt Home',
                    headerTitleAlign:'center',
                    drawerLabel: 'Alt Home',
                    drawerLabelStyle: {
                        color:'#2b72b9'
                    },
                    drawerIcon: ()=><FontAwesome5 name={'volleyball-ball'} size={20} color={'#2b72b9'} />
                }}
                />
            </Drawer>
    )
}