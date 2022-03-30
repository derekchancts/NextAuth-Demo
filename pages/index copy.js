import React, { useEffect, useState } from 'react'
// import { providers, getSession } from 'next-auth/react'
import { useSession, getProviders, signOut, signIn } from 'next-auth/react';

import Router from 'next/router'

import BtnLogin from '../components/BtnLogin'



const Login = () => {
  const [providers, setproviders] = useState();
  console.log({providers})

  const { data: session, status } = useSession();
  console.log({ session } );
  console.log({ status } );


  // useEffect(() => {
  //   const setTheProviders = async () => {
  //     const setupProviders = await getProviders();
  //     setproviders(setupProviders);
  //   };

  //   setTheProviders();
  // }, []);


  // useEffect(() => {
  //   if(session) return Router.push('/');
  // },[session])

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status, session]);



  if (status !== "authenticated") {
    return <h2>Loading...</h2>;
  };



  return (
    <>
      Signed in as {session.user?.email} <br />
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  )
}


export default Login
