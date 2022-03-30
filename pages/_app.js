import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className="container">
        <Component {...pageProps} />
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
      />
    </SessionProvider>
  );
}

export default MyApp
