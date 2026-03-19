import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)
  const getData=async()=>{
    const resp= await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=8`)
    setUserData(resp.data)
  }

  useEffect(()=>{
    getData()
  },[index])

  let printUserData=<h2 className='text-white-100 text-xl  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>loading...</h2>

  if(userData.length>0){
    printUserData=userData.map((elem,idx)=>{
      return <div key={idx}>
        <a href={elem.url}>
          <div className='h-50 w-70 bg-amber-50 rounded-2xl overflow-hidden'>
          <img className='h-full object-cover' src={elem.download_url} alt="" />
      </div>
      <div className='font-bold text-lg text-center '>{elem.author}</div>
        </a>
      </div>
    });
  }
  return (
    <div className='bg-black min-h-screen text-white flex flex-col'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-10 mt-16 mb-3'>
        {printUserData}
      </div>
      <div className='flex gap-5 items-baseline justify-center mb-20'>
        <button 
        style={{opacity:index==1?0.3:1}}
        className='bg-green-400 px-6 py-2 text-xl font-semibold rounded-sm cursor-pointer active:scale-90 ' onClick={()=>{
          if(index>1){
            setIndex(index-1)
          }
        }}>Prev</button>
        <h3>page {index}</h3>
        <button className='bg-green-400 px-6 py-2 text-xl rounded-sm font-semibold cursor-pointer active:scale-90' onClick={()=>{setIndex(index+1)}}>Next</button>
      </div>
    </div>
  )
}

export default App