import React, { useEffect ,useState} from 'react'
import { getAllClients } from '../api/clientApi'
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap'
import {ClientCard} from './ClientCard';


function Clients() {

  const loginDetails = useSelector((state) => state.auth.value);

  const [clients, setClients] = useState([]);
  const updateClientList = () => {
    getAllClients(loginDetails.token).then((response) => {
      setClients(response.data);
    });
  };

  useEffect(() => {
    updateClientList();
  },[]);

  return (
    <div className='pt-4 shadow-md rounded-sm w-4/5 h-screen'>
        <ListGroup className='w-6/12'>

          {clients ? clients.map((x)=>{
            return(
              <ClientCard key={x.id} client={x}/>
            )
          }):"No Clients Found"}
        </ListGroup>
    </div>
  )
}

export default Clients