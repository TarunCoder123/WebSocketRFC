import React from 'react'

const App = () => {

  const handleClick=()=>{
    const wsClient=new WebSocket('http://localhost:3000/ws?token=abc');
    console.log("🚀 ~ handleClick ~ wsClient:", wsClient)

  }


  return (
    <div>
      <button onClick={handleClick}>CLick me</button>
    </div>
  )
}

export default App