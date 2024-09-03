import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { ScrollView, View, useWindowDimensions } from 'react-native';

const FeaturedCardLoader = (props) => {
  const { width } = useWindowDimensions();

  // Calculate card width and margin based on screen width
  const cardWidth = 240;
  const cardHeight = 250;
  const spacing = 10;
  const viewBoxWidth = 10 * (cardWidth + spacing) + spacing;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row' }}>
        <ContentLoader
          viewBox={`0 0 ${viewBoxWidth} ${cardHeight}`}
          height={cardHeight}
          width={viewBoxWidth}
          {...props}
          backgroundColor='#ccc'
        >
          {[...Array(10)].map((_, index) => (
            <Rect
              key={index}
              x={index * (cardWidth + spacing) + spacing}
              y="0"
              rx="10"
              ry="10"
              width={cardWidth}
              height={cardHeight}
            />
          ))}
        </ContentLoader>
      </View>
    </ScrollView>
  );
};

export default FeaturedCardLoader;
