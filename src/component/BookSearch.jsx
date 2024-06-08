import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Nav from './Nav';

const BookSearch = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [added, setAdded] = useState([]);
  const [bookArr, setBookArr] = useState(JSON.parse(localStorage.getItem('collections')) ? JSON.parse(localStorage.getItem('collections')) : [] );
  const [isAdded, setIsAdded] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [booksCollection, setBooksCollection]= useState(JSON.parse(localStorage.getItem('books')));
 
  useEffect(() => {
    let getCollection = JSON.parse(localStorage.getItem('collections'));
    getCollection = getCollection ? getCollection :  localStorage.setItem('collections', JSON.stringify([]));
  }, [])

  const searchBook = async() => {
    try {
    const limit = 10;
    const page = 1;
    const API = `https://openlibrary.org/search.json?q=${searchInput}&limit=${limit}&page=${page}`;
    const res = await fetch(API);
    const data = await res.json();
    if(data === undefined || data === null) return;
    setIsSearch(false);
    localStorage.setItem('books', JSON.stringify(data.docs));
    setBooksCollection(data.docs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setIsSearch(true)
  };

  useEffect(() => {
    searchBook()

  }, [searchInput])

 


  const addToCollection = async(bookId) => {
    const allBooks = JSON.parse(localStorage.getItem('books'));
    const bookCollections = JSON.parse(localStorage.getItem('collections'));
    const findBook = allBooks.find((book) => book.cover_edition_key === bookId);
    // check if book exist before pushing
    for(let book of bookArr){

      if(book.cover_edition_key === bookId){
        return;
      }
    }
    setAdded(prev => [...prev, bookId]);
    setBookArr(prev => [...prev, findBook]);
    setIsAdded(true);
   
  }

  localStorage.setItem('collections', JSON.stringify(bookArr));

    
  return (
    <div className='p-0 m-0 w-full h-full'>
      {/* navbar  */}
      <div className='bg-gray-800'>
        <h1 className='font-bold text-xl text-white pt-5 text-center'>Personal Book Shelf</h1>
        <h1 className='font-semibold text-sm text-white pt-2 text-center'>Search To Explore Books</h1>
        <div className='mx-auto flex justify-center items-center mt-3 pb-5'>
          <input onChange={handleSearch} type="search" className='rounded-tl-xl border border-0 focus:ring-1 focus:ring-inset focus:ring-white placeholder:text-gray-400 rounded-bl-xl p-2 text-xs' placeholder='Search For Any Book' name="" id="" />
          <div className='p-[6px] cursor-pointer bg-white rounded-tr-xl rounded-br-xl'>
        <svg className='w-5 h-5 p-[3px]' version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256">
      <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
      <g><g><g><path fill="#000000" d="M96.1,10.5c-18.4,1.9-36,9.2-50.7,21.1c-4.1,3.3-12.3,11.7-15.2,15.5c-3.9,5-7.8,11.4-10.4,16.6C3.7,96.9,7.6,135,30.2,164.6c2.9,3.9,11.2,12.3,15.2,15.5c34.5,27.8,82.4,28.8,117.6,2.4l5.2-3.9l33.4,33.4c36.3,36.2,34.3,34.5,38.6,33.7c2.2-0.4,5.1-3.4,5.5-5.5c0.8-4.2,2.4-2.3-33.7-38.6l-33.4-33.4l3.9-5.2c26.4-35.2,25.4-83.2-2.4-117.6c-3.3-4.1-11.7-12.3-15.5-15.2C144.7,15,120.4,8,96.1,10.5z M116,25.4c9.6,1.2,17.5,3.6,25.9,7.9c40,20,56.4,68.8,36.5,108.5c-14,27.7-42,45.1-72.6,45.1c-27,0-52.4-13.7-67.6-36.5C18.7,121.3,20.7,82,42.9,54.7c2.7-3.3,9.4-9.9,12.7-12.5C72.2,28.9,95,22.6,116,25.4z"/></g></g></g>
      </svg>
      </div>
        </div>
      </div>

     

    <div>
      <div className='max-w-sm mx-auto'>

       {
       isSearch  ? (
          <>
      {/* loading  */}
        <div className='flex justify-center items-center'>
          <svg className='w-20 h-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150"><path fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"><animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate></path></svg>
          <h2 className='text-black text-sm font-bold'>Loading...</h2>
        </div>
          </>
        ) : (
          <>
       <h1 className='text-center'>{ booksCollection && booksCollection.length > 0 ? `${booksCollection.length} Results Found` : ''} </h1>

           {
          booksCollection && booksCollection.map((book, index) => (
        <div key={index} className='p-2 bg-white overflow-hidden m-2 rounded-xl text-wrap'>
          <div className='flex flex-col'>
              <div className='flex'>
              <h2 className='font-bold flex-none text-black text-xs'>{book && book.title}</h2>
              </div>
              <div className='flex gap-1 items-center'>
              <img src={`https://covers.openlibrary.org/b/id/${book && book.cover_i}-L.jpg`} className='w-5 h-5 rounded-full' alt="" />
              <p className='text-gray-500 flex-none text-[9px]'>by {book && book.author_name && book.author_name[0]}</p>
            </div>
              <div className='flex items-center'>
              <svg className='w-2 h-2' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill={`${book && Math.round(book.ratings_average) > 1 ? 'orange' : 'gray'}`} stroke={`${book && Math.round(book.ratings_average) > 1 ? 'orange' : 'gray'}`} d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z"  /></svg>
              <svg className='w-2 h-2' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill={`${book && Math.round(book.ratings_average) > 2 ? 'orange' : 'gray'}`} stroke={`${book && Math.round(book.ratings_average) > 2 ? 'orange' : 'gray'}`} d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z"  /></svg>
              <svg className='w-2 h-2' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill={`${book && Math.round(book.ratings_average) > 3 ? 'orange' : 'gray'}`} stroke={`${book && Math.round(book.ratings_average) > 3 ? 'orange' : 'gray'}`} d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z"  /></svg>
              <svg className='w-2 h-2' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill={`${book && Math.round(book.ratings_average) > 4 ? 'orange' : 'gray'}`} stroke={`${book && Math.round(book.ratings_average) > 4 ? 'orange' : 'gray'}`} d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z"  /></svg>
              <svg className='w-2 h-2' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill={`${book && Math.round(book.ratings_average) > 5 ? 'orange' : 'gray'}`} stroke={`${book && Math.round(book.ratings_average) > 5 ? 'orange' : 'gray'}`} d="M569.498552 94.591355l110.452601 223.834928 273.26778 40.687678c49.603745 7.397481 65.189721 42.312688 28.735461 80.583317l-199.268416 195.119933 48.854685 284.620339c6.563486 41.200354-33.247218 65.146743-68.225871 41.200354l-249.727645-130.273019L259.392772 963.953416c-34.038234 17.381879-69.038376 6.200212-62.688761-41.458227l47.764863-287.656489L39.10667 435.399391c-39.661302-36.582173-19.049868-69.979818 26.982538-76.094072l281.199427-40.85857c0 0 57.706283-117.0386 110.324688-223.64357C495.927953 23.221888 537.940812 24.269753 569.498552 94.591355z"  /></svg>
              
              <p className='text-gray-500 flex-none text-[9px]'>{book && book.ratings_count} votes</p>
              </div>
              
            </div>
          <div className=' flex justify-between'>
            <div className='flex gap-1 items-center'>
            </div>
            <div className='flex gap-1 items-center rounded-2xl bg-black px-4 py-2 hover:scale-110'>
              { isAdded && added.includes(book.cover_edition_key) ? (
                            <svg fill="white" className='w-5 h-5 cursor-pointer' xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 511.97"><path fill-rule="nonzero" d="m138.85 214.68 61.34-.82 4.57 1.19c21.52 12.41 40.78 27.9 57.46 46.31 22.01-35.41 45.45-67.92 70.22-97.82 27.13-32.77 55.92-62.49 86.16-89.62l5.99-2.3h66.93l-13.49 14.99c-41.48 46.09-79.11 93.72-113.11 142.84-34.02 49.17-64.43 99.92-91.47 152.16l-8.41 16.24-7.74-16.54c-28.23-60.59-68.03-112.19-123.45-150.24l5-16.39zM255.98 0c38.45 0 76.18 8.56 110.84 25.2 2.23 1.07 3.19 3.78 2.12 6.02-.31.64-.75 1.18-1.28 1.6l-37.54 30.72a4.565 4.565 0 0 1-4.67.72c-22.26-8.06-45.75-12.11-69.42-12.11-54.27 0-105.78 21.29-144.14 59.69-38.39 38.41-59.7 89.83-59.7 144.14 0 54.28 21.29 105.75 59.69 144.13 38.42 38.4 89.83 59.71 144.15 59.71 54.22 0 105.79-21.31 144.12-59.7 38.41-38.39 59.7-89.84 59.7-144.14 0-13.2-1.21-26.19-3.75-39.16-.27-1.41.15-2.82 1.03-3.83l33.11-41.96c1.56-1.94 4.42-2.23 6.36-.67.73.59 1.22 1.36 1.48 2.2 9.25 26.83 13.92 55.05 13.92 83.42 0 68.03-26.87 132.89-74.98 181-48.1 48.09-112.98 74.99-180.99 74.99-68.03 0-132.89-26.89-181-74.99l-.18-.2C26.81 388.67 0 323.97 0 255.98 0 187.96 26.87 123.1 74.98 74.99l.2-.18C123.29 26.81 188.02 0 255.98 0z"/></svg>

              ) : ( 
              <svg fill="white" className='w-5 h-5' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 389.691 389.691" >
            <g>
              <path d="M152.678,30h3.494c25.314,0,45.945,20.443,46.246,45.689h30.002C232.115,33.902,198.027,0,156.172,0h-3.494
                C110.82,0,76.732,33.902,76.43,75.689h30.001C106.731,50.443,127.361,30,152.678,30z"/>
              <path d="M291.168,205.117V92.189c0-3.313-2.688-6-6-6H23.682c-3.315,0-6,2.687-6,6v223.869c0,16.542,13.457,30,30,30h153.074
                c16.393,26.182,45.49,43.633,78.592,43.633c51.094,0,92.662-41.568,92.662-92.662C372.01,249.939,336.701,210.94,291.168,205.117z
                M89.049,144.02c-9.511,0-17.248-7.737-17.248-17.248c0-9.512,7.737-17.249,17.248-17.249c9.51,0,17.246,7.737,17.246,17.249
                C106.295,136.282,98.559,144.02,89.049,144.02z M202.553,126.771c0-9.512,7.736-17.249,17.246-17.249
                c9.512,0,17.25,7.737,17.25,17.249c0,9.511-7.738,17.248-17.25,17.248C210.289,144.02,202.553,136.282,202.553,126.771z
                M278.014,364.691c-37.369,0-67.662-30.293-67.662-67.662c0-37.369,30.293-67.662,67.662-67.662s67.662,30.293,67.662,67.662
                C345.676,334.398,315.383,364.691,278.014,364.691z"/>
              <path d="M302.848,280.625h-8.429v-8.429c0-9.061-7.345-16.404-16.404-16.404c-9.06,0-16.404,7.344-16.404,16.404v8.429h-8.429
                c-9.061,0-16.404,7.345-16.404,16.404s7.344,16.404,16.404,16.404h8.429v8.429c0,9.059,7.345,16.404,16.404,16.404
                c9.06,0,16.404-7.346,16.404-16.404v-8.429h8.429c9.059,0,16.404-7.345,16.404-16.404S311.906,280.625,302.848,280.625z"/>
            </g>
            </svg>
          )}
           



            <button onClick={() =>addToCollection(book && book.cover_edition_key)} className='text-xs text-white font-bold duration-200 transition-transform cursor-pointer'>{ added.includes(book.cover_edition_key) ? 'Added' : 'Add To Shelf'}</button>
            </div>

          </div>
        </div>
           ))
        }
          </>
        )
       } 
     
        
       
      </div>
     
    </div>
       <Nav />
      
    </div>
  )
}

export default BookSearch
