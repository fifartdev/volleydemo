import { FlatList } from "react-native";
import Card from "./Card";


const HorizontalList = ({ data }) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card title={item.title.rendered} image={item.fimg_url} views={item.post_views_count} onPress={() => console.log(item.id)} />
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );

export default HorizontalList