import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  useGetAnimeReviewsQuery,
  useGetAnimeVideosEpisodesQuery,
} from '@src/services/api/apiSlice';
import EspisodeCard from './EspisodeCard';
import ReviewCard from './ReviewCard';
import { AnimeEspisode, AnimeReviewData } from '@src/types/animeTypes';

interface componentPropsInterface {
  synopsis: string;
  id: number;
}

const AnimeDetailTabView = (props: componentPropsInterface) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const SynopsisRoute = () => (
    <ScrollView style={styles.tab} key={1}>
      <Text className="text-ghostWhite font-main mx-5 my-2">{props.synopsis}</Text>
    </ScrollView>
  );

  const EpisodesRoute = () => {
    const { data } = useGetAnimeVideosEpisodesQuery(props.id);

    return (
      <ScrollView key={2}>
        {data?.data?.map((item: AnimeEspisode) => (
          <EspisodeCard
            img={item?.images?.jpg.image_url}
            espisode={item.mal_id}
            title={item.title}
            id={item.mal_id}
            key={item.mal_id}
            url={item.url}
          />
        ))}
      </ScrollView>
    );
  };

  const ReviewRoute = () => {
    const { data } = useGetAnimeReviewsQuery(props.id);

    return (
      <ScrollView style={styles.tab} key={3}>
        {data?.data.map((item: AnimeReviewData) => (
          <ReviewCard
            userName={item.user.username}
            date={item.date.slice(0, 10)}
            image={item.user.images.jpg.image_url}
            review={item.review}
            id={item.mal_id}
            key={item.mal_id}
          />
        ))}
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    synopsis: SynopsisRoute,
    episodes: EpisodesRoute,
    review: ReviewRoute,
  });

  const [routes] = useState([
    { key: 'synopsis', title: 'Synopsis' },
    { key: 'episodes', title: 'Episodes' },
    { key: 'review', title: 'Review' },
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

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
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={styles.tabView}
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
