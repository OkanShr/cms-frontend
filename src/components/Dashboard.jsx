import React from 'react';

function Dashboard() {
  const Clientnum = 5;
  return (
    <div className='w-full max-w-2xl'>
      <h1 className='text-dark m-5'>Dashboard</h1>
      <div className='flex justify-center'> {/* Added flex and justify-center */}
        <h2 className=''>Clients</h2>
      </div>
      <div className='m-3  justify-around flex flex-row'>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Last 3 Months</h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Last 6 Months</h3>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-teal-700 text-center text-bold'>{Clientnum}</h2>
          <h3>Last 12 Months</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
