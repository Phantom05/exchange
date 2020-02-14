
import axios from 'axios';

export const getExchangeData = contruy =>{
  const axiosConf={
    url:`https://earthquake.kr:23490/query/${contruy.join(',')}`
  }
   
  return axios(axiosConf)
}