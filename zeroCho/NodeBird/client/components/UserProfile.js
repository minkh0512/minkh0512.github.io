import React from 'react';
import {Card, Avatar} from 'antd';

const dummy = {
  nickname: '엠카이',
  Post: [],
  Followings: [],
  Flolowers: [],
  isLoggedIn: false,
}

const UserProfile = () => {
  return (
    <Card
      style= {{ margin: '10px' }}
      actions={[
        <div key="twit">짹짹<br />{dummy.Post.length}</div>,
        <div key="following">팔로잉<br />{dummy.Followings.length}</div>,
        <div key="flolower">팔로워<br />{dummy.Flolowers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
        title={dummy.nickname}
      />
    </Card>
  )
}

export default UserProfile;