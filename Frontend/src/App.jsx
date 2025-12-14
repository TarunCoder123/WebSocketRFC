import React from 'react'

const App = () => {

  const handleClick=()=>{
    const wsClient=new WebSocket('http://localhost:8080/ws');
    console.log("🚀 ~ handleClick ~ wsClient:", wsClient)

  }


  return (
    <div>
      <button onClick={handleClick}>CLick me</button>
    </div>
  )
}

export default App