import React, { Component } from 'react';

import style from './Page1.css';

import image from './images/toy03.jpg';

export default class Page1 extends Component {
  render() {
    return (
      <div className={style.box}>
        this is page1~
        <img src={image}></img>
      </div>
    );
  }
}
