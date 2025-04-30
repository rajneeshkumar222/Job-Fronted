import React, { useEffect, useState } from 'react'
import Hero from '../components/Home.jsx/Hero'
import LatestJob from '../components/Home.jsx/LatestJob'
import axios from 'axios';
import JobCart from '../components/JobCart/JobCart';

function Home() {
  const [data,setData]=useState([]);

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const response = await axios.get("http://localhost:4001/api/v1/alljobs");
        setData(response.data.data);
      }
      catch(e){
        console.log("Error: ",e);
      }
    }
    fetchData();
  },[]);

  return (
    <div className='w-full items-center text-center p-10 min-h-screen'>
      
      <Hero/>
      <LatestJob/>

      <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {data.slice(0,4).map((items, i) => (
          <div  key={i}><JobCart data={items} /></div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Home
