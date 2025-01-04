import React from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function Layout({children, }: { children: React.ReactNode}) {
    return (
      <section >
         <Header/>
        {children}
      </section >
    )
  }