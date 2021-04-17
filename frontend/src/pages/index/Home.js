import React, { useState } from 'react';
import HomeNav from '../../components/Nav';
import Header from './Header';
import Message from '../../components/Message';

const HomePage = () => {

    return (
        <>
            <HomeNav />
            <Message />
            <Header />
        </>
    )
}

export default HomePage;