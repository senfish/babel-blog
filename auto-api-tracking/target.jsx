import _errorCenter2 from "error-center";
import React, { useEffect, useState } from 'react'; // import ErrorCenter from 'error-center';

const getListDispatch = async () => {
  try {
    let a = 'aaa';
    return request.get();
  } catch (err) {
    _errorCenter2.add(err);
  }
};

const getUserDispatch = () => {
  try {
    return request.get();
  } catch (err) {
    console.log('err', err);
  }
};

const Demo = () => {
  useEffect(() => {
    getListDispatch();
    getUserDispatch();
  }, []);
  return <div>content</div>;
};

export default Demo;