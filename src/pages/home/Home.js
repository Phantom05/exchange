import React, { useEffect } from 'react';
import { getExchangeData } from 'lib/api';
import { useImmer } from 'use-immer';
import moment from 'moment';
import styled from 'styled-components';
import {TopCard} from 'components/common/card';
import cx from 'classnames';

 // "USDKRW" : [Price, Change, ChangePercent, PreviousClose, Open, DayLow, DayHigh]
function Home(props) {
  const [values, setValues] = useImmer({
    update: "",
    USDCNY: "",
    USDKRW: "",
    pending:true,
    time:moment().format('YYYY-MM-DD hh:mm:ss')
  });
  const wiwan = values.USDCNY && values.USDCNY.toString().substring(0, 3);
  const dollar = values.USDCNY && values.USDKRW.toString().substring(0, 6);
  const updateDate = values.update && moment(values.update).format("YYYY-MM-DD hh:mm:ss");

  const UpdateChange = async () => {
    const { data } = await getExchangeData(['USDCNY', 'USDKRW']);
    console.log(data);
    setValues(draft => {
      draft.update = data.update;
      draft.USDCNY = data.USDCNY[3];
      draft.USDKRW = data.USDKRW[3];
    })
  }

  const handleLoad = val=>{
    setValues(draft => {
      draft.pending = false;
    })
  }

  useEffect(() => {
    UpdateChange();
    const abc = setInterval(async () => {
      UpdateChange()
    }, 5000);
    const interTime = setInterval(() => {

      setValues(draft => {
        draft.time = moment().format('YYYY-MM-DD hh:mm:ss');
      })
    }, 1000);

    return () => {
      clearInterval(interTime);
      clearInterval(abc);
    }
  }, []);

  return (
    <Styled.Home >
      <div className={cx('loading',{isShow:values.pending})}>
        <div className="loading__item">
          Loading...
        </div>
      </div>
      <div className="time__box">{values.time}</div>
      <h3 className="title">
      환율 <span className="update__date">Update : {updateDate}</span>
      </h3>
      
      <div className="clearfx">
      <TopCard title="위완" value={wiwan}/> 
      <TopCard title="원화" value={dollar}/> 
      </div>

    <br className="br"/>
      <iframe
        src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=2111,650"
        width={"100%"}
        height={"230px"}
        frameBorder="0"
        onLoad={handleLoad}
      >

      </iframe>
    </Styled.Home>
  );
}

const Styled = {
  Home: styled.div`
  padding:30px;
  padding-top:100px;
  .time__box{
    position:absolute;
    top:8px;
    left:50%;
    color:white;
    transform:translateX(-50%);
    font-size:14px;
    
  }
  .loading{
    position:fixed;
    background:#282c34;
    color:white;
    z-index:50;
    left:0;
    top:0;
    width:100%;
    height:100%;
    display:none;
    &.isShow{
      display:block;
    }
    .loading__item{
      position: absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
    }
  }
  .clearfx{
    display:block;
    &:after{
      content:"";
      clear: both;
    }
  }
  .update__date{
    float:right;
    font-size:14px;
    font-weight:400;
  }
  .title{
    background:#212121;
    color:white;
    padding:10px;
  }
    .br{
      display:block;
      margin-top:15px;
    }
  `
}
export default Home;