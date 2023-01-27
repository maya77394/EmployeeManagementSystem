import Lottie from 'lottie-react';
import welcome from "../welcome.json";
import React, {Component} from 'react';
import '../navBar.css';

function welcomePage(){

    return (
        <div className='Back'>
            <h1 className='Message'>Welcome!</h1>
            <p className='Text'>Empowering you to manage your workforce, effortlessly</p>
            <img src="https://visme.co/blog/wp-content/uploads/2020/06/Header-3.gif" className='Welc'></img>
        </div>
    )
}

export {welcomePage};