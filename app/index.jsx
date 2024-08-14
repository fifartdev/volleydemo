import { Link, Redirect } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Redirect href={'/(drawer)'}/>
    </View>
  );
}
