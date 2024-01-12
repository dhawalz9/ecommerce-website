import React from 'react'
import Header from './Header.js'
import Footer from './Footer'
import {Helmet} from "react-helmet"
import { Toaster } from 'react-hot-toast';

const Layout = ({children,title,dsescription,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <meta name="description" content={dsescription}/>
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main style={{minHeight:"70vh"}}>
        <Toaster/>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title:"Ecommerce Shop now",
  dsescription: "We sell goods",
  keywords:"Amazon, flipkart, ecomm, India one",
  author:"dz",
}

export default Layout
