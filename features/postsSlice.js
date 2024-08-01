import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    try {
        // Await the result of the fetch request
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        // Check if the response is okay before proceeding
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Await and parse the JSON data
        const formattedData = await response.json();
        const modifiedData = formattedData.map(post=>({...post, isLiked:false, isBookmarked:false}))
        return modifiedData;

    } catch (error) {
        console.log("error", error.message);
        throw error
    }
})
const initialState = {
    posts: [],
    likedPosts: [],
    bookMarked: [],
    isPending: true,
    isError: false
}

export const postsSlice = createSlice({
    name: 'post',
    initialState,

    reducers: {
        itemLiked: (state,action)=>{
           const likedPost = state.posts.find(post=>post.id===action.payload);
           if(likedPost){
            likedPost.isLiked = !likedPost.isLiked;
            if(!state.likedPosts.includes(action.payload)){
                state.likedPosts.push(action.payload);
            }
            else{
                const index = state.likedPosts.indexOf(action.payload);
                state.likedPosts.splice(index,1);
            }
           }
        },
        itemBookmarked: (state,action)=>{
           const bookmarkedPost = state.posts.find(post=>post.id===action.payload);
           if(bookmarkedPost){

               if(!state.bookMarked.includes(action.payload)){
                   state.bookMarked.push(action.payload);
                   bookmarkedPost.isBookmarked = true;
            }
            else{
                const index = state.bookMarked.indexOf(action.payload);
                state.bookMarked.splice(index,1);
                bookmarkedPost.isBookmarked = false;
            }
           }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isPending = true;
            console.log('pending');
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.isPending = false;
            console.log('fullfilled');
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.isPending = false;
            state.isError = true;
            console.log('rejected');
        })
    }
})
export const {itemLiked,itemBookmarked} = postsSlice.actions;
export default postsSlice.reducer;