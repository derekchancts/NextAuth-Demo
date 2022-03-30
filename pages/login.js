import React, { useEffect, useState } from 'react'
// import { providers, getSession } from 'next-auth/react'
import { useSession, getProviders, signOut, signIn } from 'next-auth/react';

// import Router from 'next/router'
import { useRouter } from 'next/router'

import BtnLogin from '../components/auth/BtnLogin'



const Login = () => {
  const router = useRouter()
  
  const [providers, setproviders] = useState();
  const [providersArray, setProvidersArray] = useState([]);
  // const [uniqueKeys, setUniqueKeys] = useState([]);
  

  // console.log({providers})
  // console.log(providersArray)


  const { data: session, status } = useSession();
  // console.log({ session } );
  // console.log({ status } );



  // providers && Object.keys(providers).map(key => {
  //   if (!uniqueKeys.includes(key)) {
  //     // uniqueKeys.push(key);
  //     setUniqueKeys(prev => [
  //       ...prev,
  //       key
  //     ])
  //   }
  // });

  // console.log({uniqueKeys})

 

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };

    setTheProviders();
  }, []);



  // useEffect(() => {
  //   const setArray = async () => {
  //     const arr = providers && Object.keys(providers).map(key => {
  //       // return { [key]: providers[key] }
  //       return { [key]: providers[key] }
  //     });
  //     setProvidersArray(arr);
  //   }

  //   setArray();
  // }, [providers])

  // const arr = providers && Object.keys(providers).map(key => {
  //   return { [key]: providers[key] }
  // });



  useEffect(() => {
    const setArray = async () => {
      const arr = providers && Object.entries(providers);
      setProvidersArray(arr);
    }

    setArray();
  }, [providers])


  // const arr1 = providers && Object.entries(providers);
  // console.log({arr1})

  
  
  useEffect(() => {
    if(session) router.push('/')
  }, [session])


  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user?.email} <br />
  //       <button type="button" onClick={() => signOut()}>
  //         Sign out
  //       </button>
  //     </>
  //   );
  // }

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}>
      <div style={{maxWidth: '450px', width: '100%'}}
      className="border border-1 max-auto p-4 shadow">

        <h2 className="text-center fw-bolder text-uppercase"
        style={{ color: '#555', letterSpacing: '1px' }}>
          NextAuth Demo
        </h2>

        <p className="text-center">Login with NextAuth</p>


        {/* {providers?.google && (
          <>
            <br />
            <br />
            <button type="button" onClick={() => signIn(providers.google.id)}>
              Google Login
            </button>
           
          </>
        )}

        {providers?.github && (
          <>
            <br />
            <br />
            <button type="button" onClick={() => signIn(providers.github.id)}>
              Github Login
            </button>
          </>
        )} */}


        {
          providersArray && providersArray.map((provider, index) => (
            <div key={index}>
              {/* <p>{provider[1].id}</p> */}
              <BtnLogin 
                provider={provider[1]}
                // bgColor='#f2573f'
              />
            </div>
          ))
        }
        
      </div>
    </div>
  )
}

// Login.getInitialProps = async (context) => {
//   return {
//     providers: await providers(context),
//     session: await getSession(context)
//   }
// }

export default Login
