import React from 'react'
import { signIn } from 'next-auth/react'


const BtnLogin = ({provider, bgColor, txtColor}) => {

  if (provider.id === 'email') { bgColor ='lightblue', txtColor = "black" }
  if (provider.id === 'facebook') bgColor ='#0404be'
  if (provider.id === 'github') bgColor ='#444'
  if (provider.id === 'auth0') { bgColor ='yellow', txtColor = "black" }
  if (provider.id === 'google') bgColor ='#f2573f'
  if (provider.id === 'credentials') { bgColor ='lightgreen', txtColor = "black" }


  return (
    <div>
      <button className="btn w-100 my-2 py-3"
        style={{ background: `${bgColor}`, color: `${txtColor}`}}
        onClick={() =>signIn(provider.id)}>
        Sign in with {provider.name}
      </button>
    </div>
  )
}

BtnLogin.defaultProps = {
  txtColor: '#eee'
}


export default BtnLogin
