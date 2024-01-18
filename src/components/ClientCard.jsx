import React from 'react'
import { Button,Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const ClientCard =(props)=> {
    const {client} = props;
    const navigate = useNavigate();
  return (
  <div className='m-2 shadow-md p-2'>

    <div className='flex flex-row justify-between '>
    <span className='text-dark '>{`${client.firstName} ${client.lastName}`}</span>
    <Button className='m-2' onClick={()=> navigate(`/client/${client.id}`)}>Client Details</Button>
    </div>
    
    
  </div>
  );
}
