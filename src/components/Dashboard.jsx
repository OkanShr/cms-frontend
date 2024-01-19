import React from 'react'



function Dashboard() {
  const Clientnum = 5;
  return (
    <div className='w-full max-w-2xl'>
      <h2 className='text-dark m-5'>Dashboard</h2>
      <div className='m-3  justify-around flex flex-row'>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Clients</h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Clients</h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Clients</h3>
        </div>
      </div>
    </div>
  )
}

export default Dashboard