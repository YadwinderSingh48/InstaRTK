import { StatusBar, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { BookmarkIcon, ChatBubbleOvalLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import stories from '../constants/stories';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, itemBookmarked, itemLiked } from '../features/postsSlice';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const data = useSelector(state => state.posts.posts);
  const likedItems = useSelector(state => state.posts.likedPosts);
  const isError = useSelector(state => state.posts.isError);

  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Instagram</Text>
        <View style={styles.headerIconContainer}>
          <HeartIcon fill={'white'} size={30} color={'black'} />
          <ChatBubbleOvalLeftIcon size={30} fill={'white'} color={'black'} />
          <BookmarkIcon onPress={()=>navigation.navigate('Bookmarked')} size={30} color={'black'} fill={'white'} />
        </View>
      </View>

      <View style={styles.storySection}>
        <FlatList
          data={stories}
          renderItem={({ item, index }) =>
            <View style={{ alignItems: 'center', gap: 2 }}>
              <LinearGradient
                colors={['#f9ce34', '#ee2a7b', '#6228d7']}
                style={styles.gradientRing}>
                <Image style={styles.storyImage} source={{ uri: 'https://picsum.photos/200' }} />
              </LinearGradient>
              <View><Text style={{ fontWeight: 'light', color: 'gray' }}>{item.user.username}</Text></View>
            </View>
          }
          horizontal={true}
          contentContainerStyle={{ gap: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View>
        <FlatList
          data={data}
          
          renderItem={({ item, index }) => 
            <View style={{}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginHorizontal: 5, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.profileImage} />
                  <Text numberOfLines={1} style={styles.profileText}>{item.title}</Text>
                </View>
                <Entypo name='dots-three-vertical' size={20} color={'black'} />
              </View>
              <View>
                <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: '100%', height: 500 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', marginHorizontal: 15, marginVertical: 8, gap: 10 }}>
                    <HeartIcon onPress={()=>dispatch(itemLiked(item.id))} fill={item.isLiked?'red' : 'white'} size={35} color={item.isLiked?'red' : 'black'} />
                    <ChatBubbleOvalLeftIcon size={35} fill={'white'} color={'black'} />
                  </View>
                  <BookmarkIcon onPress={()=>dispatch(itemBookmarked(item.id))} size={30} color={'black'} fill={item.isBookmarked?'black' : 'white'} style={{ marginRight: 8 }} />
                </View>
              </View>
            </View>
            }
        />

      </View>


    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingHorizontal: 8,
    marginVertical: 10,
    paddingBottom: 5,
    // borderBottomWidth: 0.5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',

  },
  headerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    margin: 5,
    borderWidth: 2,
    borderColor: 'white'
  },
  gradientRing: {
    height: 88,
    width: 88,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center'

  },
  storySection: {
    marginHorizontal: 5,
    padding: 8,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.4
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    resizeMode: 'cover'
  },
  profileText: {
    fontSize: 16,
    fontWeight: 'bold',
    width:'40%',
    
  }
})