/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import {api} from '../services';

export const useFetch = ({path}) => {
  const [state, setState] = useState({loading: true, response: null});

  useEffect(() => {
    api
      .get(path)
      .then(({data}) => setState({response: data.data, loading: false}))
      .catch(() => setState({loading: false}));
  },[]);

  return state;
};

export default useFetch;
