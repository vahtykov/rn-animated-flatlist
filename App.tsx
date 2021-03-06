import * as React from 'react';
import { StatusBar, FlatList, Image, Animated, Text, View, Dimensions, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const BG_IMG = 'https://assets.imgix.net/hp/snowshoe.jpg?auto=compress';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3; // высота нашего элемента списка

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <StatusBar hidden />
    <Image
      source={{ uri: BG_IMG }}
      style={StyleSheet.absoluteFillObject}
      blurRadius={80}
    />
    <Animated.FlatList
      data={DATA}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
      keyExtractor={item => item.key}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 42,
      }}
      renderItem={({item, index}) => {
        const inputRange = [
          -1,
          0,
          ITEM_SIZE * index,
          ITEM_SIZE * (index + 2),
        ]

        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 1, 0],
        })

        return (
          <Animated.View style={{
            flexDirection: 'row',
            padding: SPACING,
            marginBottom: SPACING,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.7)',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: .3,
            shadowRadius: 20,
            transform: [{ scale }],
          }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE,
                marginRight: SPACING / 2,
              }}
            />
            <View>
              <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
              <Text style={{fontSize: 18, opacity: .7}}>{item.jobTitle}</Text>
              <Text style={{ fontSize: 12, opacity: .8, color: '#0099cc' }}>{item.email}</Text>
            </View>
          </Animated.View>
        )
      }}
    />
  </View>
}
