import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn: false,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '엠카이',
    },
    content: '처음올려봐요',
    img: 'https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg',
  }],
}

const Home = () => {
  return (
    <div>
      {dummy.isLoggedIn && <PostForm />}
      {dummy.mainPosts.map((c) => {
        return (
          <PostCard key={c} post={c} />
        )
      })}
    </div>
  )
}

export default Home;