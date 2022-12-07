import { View, useWindowDimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { EpisodesRoute } from './EpisodeRoute';
import { SynopsisRoute } from './SynopsisRoute';
import { ReviewRoute } from './ReviewRoute';
import { useViewportUnits } from '@app/hooks/main';

interface componentPropsInterface {
  synopsis: string;
  id: number;
}

const AnimeDetailTabView = (props: componentPropsInterface) => {
  const { vw } = useViewportUnits();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'synopsis':
        return <SynopsisRoute synopsis={props.synopsis} />;
      case 'episodes':
        return <EpisodesRoute id={props.id} />;
      case 'review':
        return <ReviewRoute id={props.id} />;
      default:
        return null;
    }
  };
  
  const [routes] = useState([
    { key: 'synopsis', title: 'Synopsis' },
    { key: 'episodes', title: 'Episodes' },
    { key: 'review', title: 'Review' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((_x, i: number) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity key={i} style={styles.tabItem} onPress={() => setIndex(i)}>
              <Animated.Text
                className="font-main text-[13px]"
                style={[styles.tabItemText, { opacity }]}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: vw * 100 }}
      renderTabBar={renderTabBar}
      className="flex-1"
    />
  );
};

export default AnimeDetailTabView;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    color: 'white',
  },
  tabItemText: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  tab: {
    backgroundColor: '#000',
    flex: 1,
  },
  tabView: {
    height: 500,
    flex: 1,
  },
});
