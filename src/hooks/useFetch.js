/* eslint-disable prettier/prettier */
import {useEffect, useState} from 'react';
import axios from 'axios';

export const useFetch = ({path}) => {
  const [state, setState] = useState({loading: true, response: null});

  useEffect(() => {
    axios
      .get(`https://geniouz-strapi.herokuapp.com/${path}`)
      .then(({data}) => setState({response: data, loading: false}))
      .catch(() => setState({loading: false}));
  },[]);

  return state;
};

export default useFetch;
