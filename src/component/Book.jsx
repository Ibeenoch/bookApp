import React from 'react'
import Nav from './Nav';

const Book = () => {
  const book = JSON.parse(localStorage.getItem('book'));
  return (
    <div>
       <div className='bg-gray-800 p-5'>
        <h2 className='text-white text-sm font-bold text-center'>Book Details</h2>
        </div>

        <div className='mt-5 flex justify-center items-center'>      
            <div className='p-2 bg-white overflow-hidden rounded-xl text-wrap'>
              <div className='flex gap-2 p-1'>
                <img src={book && book.imgUrl} className='w-[100px]' alt="" />
                <div className='flex flex-col'>
                  <div className='flex'>
                  <h2 className='font-bold flex-none text-black text-sm'>{book && book.title}</h2>
                  </div>
                  <div className='flex'>
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
                  <div className='text-wrap'>
                  <p className='text-gray-500 flex-none text-sm max-w-sm'>{book && book.description && book.description.value || book.description}</p>
                  </div>
                </div>
              </div>
              <div className='mt-0 flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <svg className='w-4 h-4' version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
                  <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                  <g><g><g><path fill="gray" d="M116.9,54.6c-40.1,4.2-76.6,27.4-103.3,65.7c-4.8,7-4.8,8.3,0,15.2c12.2,17.5,28.2,33.5,44.3,44.1c33.8,22.4,72.2,27.9,108.8,15.5c28.6-9.6,55.6-30.9,75.6-59.7c4.9-7.1,4.9-8.3-0.5-16c-16.8-23.7-36.5-41.1-59.2-52.3c-12.8-6.3-24.1-9.9-38-12C138.9,54.4,122.7,54,116.9,54.6z M138.7,85c8.3,2.1,14.7,5.9,20.7,12c6,6,9.8,12.8,11.9,21.1c1.1,4.4,1.1,15.4,0,19.7c-2.1,8.5-5.8,14.9-12.1,21.3c-6.3,6.3-12.7,10-21.3,12.1c-4.4,1.1-15.4,1.1-19.7,0c-8.4-2.1-15.1-5.9-21.3-12c-6.1-6.2-9.9-12.9-12-21.3c-1.1-4.4-1.1-15.4,0-19.7c4.4-17.5,17.9-30.4,35.5-33.8C124.9,83.4,134.1,83.8,138.7,85z"/></g></g></g>
                  </svg>              
                  <p className='text-gray-500 flex-none text-[9px]'> {book && book.readinglog_count} people</p>
                </div>
              </div>
            </div>
            <Nav/>
        </div>
    </div>
  )
}

export default Book
