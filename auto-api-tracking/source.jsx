import React, {useEffect, useState} from 'react';

const getListDispatch = async () => {
  let a = 'aaa';
  return request.get();
}
const getUserDispatch = () => {
  try {
    return request.get();
  } catch (err) {
    console.log('err', err);
  }
}
const Demo = () => {
  useEffect(() => {
    getListDispatch();
    getUserDispatch();
  }, []);
  return (
    <div>content</div>
  )
};

export default Demo;
