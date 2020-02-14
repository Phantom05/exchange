import React from 'react';
import styled from 'styled-components';


function TopCard(props) {
  const { title, value } = props;
  return (
    <Style.TopCard>
      <div className="card__title">1 Dollar </div>
      <div className="card__value">
        <span className="tx">
          {value} <small>{title}</small>
        </span>
      </div>
    </Style.TopCard>
  );
}

export default TopCard;

const Style = {
  TopCard: styled.div`
  display:inline-block;
  margin:5px;
  padding:10px;
  border-radius:3px;
  border:1px solid #b8b8b8;
  background:white;
    .card__title{
      font-size:14px;
    }
    .card__value{
      
    }
    .tx{
      font-weight:bold;
    }
  `
}