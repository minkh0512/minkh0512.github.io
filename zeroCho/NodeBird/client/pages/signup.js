import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import { signupAction } from '../reducers/user';
import { useDispatch } from 'react-redux';

const TextInput = ({ value }) => {
  return (
    <div>{value}</div>
  )
}

export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) =>{
    setter(e.target.value);
  }, []);
  return [value, handler];
};

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nickName, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(password !== passwordCheck){
      return setPasswordError(true);
    }
    if(!term){
      return setTermError(true);
    }
    dispatch(signupAction({
      id,
      password,
      nickName,
    }));
  }, [password, passwordCheck, term]);
    
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);
    
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <TextInput value="1233" />
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nickName} required onChange={onChangeNickName} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-chkeck">비밀번호 확인</label>
          <br />
          <Input name="user-password-chkeck" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의하세용</Checkbox>
          {termError && <div style={{ color: 'red' }}>약관에 동의해야 합니다.</div>}
        </div>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit">가입하기</Button>
        </div>
      </Form>
    </>
  )
}

Signup.propTypes = {
  
}

export default Signup;