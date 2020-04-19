import React from 'react';
import { Input, Form, Button} from 'antd';

const dummy = {
  isLoggedIn: true,
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

const PostForm = () => {
  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data">
      <Input.TextArea maxLength={140} placeholder="무슨일이 있었나요?" />
      <div style={{ marginTop: '10px' }}>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {dummy.imagePaths.map((v, i) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  )
}

export default PostForm;