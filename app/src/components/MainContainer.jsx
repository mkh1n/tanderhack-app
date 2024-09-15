/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import  subscribeToSocketEvents from '../socket'

const MainContainer = (props) => {
  useEffect(()=>{
    subscribeToSocketEvents();
  })
  return <div id="mainContainer">
    {props.children}
  </div>
}
export default MainContainer