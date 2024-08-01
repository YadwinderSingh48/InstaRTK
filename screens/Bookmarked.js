import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { itemBookmarked } from '../features/postsSlice';

const Bookmarked = () => {
    const bookmarkedData = useSelector(state => state.posts.bookMarked);
    const posts = useSelector(state => state.posts.posts);
    const filterdList = posts.filter(post => bookmarkedData.includes(post.id));
    const dispatch = useDispatch();

    return (
        <View style={{flex:1}}>
            <FlatList
                data={filterdList}
                renderItem={({ item, index }) =>
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginHorizontal: 5, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.profileImage} />
                                <Text numberOfLines={1} style={styles.profileText}>{item.title}</Text>
                            </View>
                            <BookmarkIcon onPress={() => dispatch(itemBookmarked(item.id))} size={30} color={'black'} fill={item.isBookmarked ? 'black' : 'white'} style={{ marginRight: 8 }} />
                        </View>

                    </View>
                }
            />
        </View>
    )
}

export default Bookmarked

const styles = StyleSheet.create({
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
        resizeMode: 'cover'
    },
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        width: '40%',

    }
})