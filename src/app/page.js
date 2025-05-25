//sab sy phly useEffect chly ga or wo data fetch kry ga server sy yani jo movie 1st page pr nzr ati hai search kia bgair wo useEffect ki wja sy nzr ati hai



'use client';

import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard'; // 👈 Use relative path instead of alias

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  console.log('API KEY:', process.env.NEXT_PUBLIC_TMDB_API_KEY);


  const fetchTrending = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
      const data = await res.json();
      setMovies(data.results || []); // safe fallback
    } catch (err) {
      // console.error('Error fetching trending movies:', err);
      setError('Failed to load movies.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // movie ka name likh kr jab enter krty hai tu e.preventDefault() page ko reload hony sy bchata ha
    if (!query.trim()) return; //trim use hota ha extra space khtm krny k lia
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to search movies.');
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">🎬 Movie Explorer</h1>


      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-4 border-yellow-400 bg-gray-300 p-2 ml-115 rounded-2xl"
        />
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {Array.isArray(movies) && movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} send={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </main>
  );
}


// "use client"
// import {useState,useEffect} from "react"
// import MovieCard from '../components/MovieCard'

// export default function Home(){
// const [put,setPut]=useState("")
// const [receive,setReceive]=useState([])
// const [error,setError]=useState('')

// const firstLoad=async()=>{

//   try {
//     const q1= await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
//     const q2=await q1.json()
//     setReceive(q2.results || []);
//   } catch (error) {
//     setError('something went wrong')
    
//   }

// }

// const runFunction=async(e)=>{
//   e.preventDefault();

//   if(!put.trim()) return;
//   try {
//     const q1= await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${put}`);
//     const q2=await q1.json()
//     setReceive(q2.results || [])
//   } catch (error) {
//     setError('movie not found')
    
//   }
// }
// useEffect(()=>{
//   firstLoad()
// },[])


//   return(
//     <main>
//       <form onSubmit={runFunction}>
//         <input 
//         type="text"
//         placeholder="write movie name"
//         value={put}
//         onChange={(e)=>setPut(e.target.value)}
//         />
//       </form>
//       <div>
//         {error && <p>{error}</p>}
//       </div>
      
//         {Array.isArray(receive) && receive.length>0 ? (receive.map((next)=>(
//            <MovieCard key={next.id} send={next} />
//         ))):( <p> movie not found</p>
//       )}
//     </main>
//   )
// } 