import React, {  useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const getNote = JSON.parse(localStorage.getItem('note'));
  const [note, setNote] = useState(getNote)
  const [added, setAdded] = useState(false);
  const [close, setClose] = useState(false);
  const [open, setOpen] = useState(false);

  let currentDate = new Date();

let getdate = currentDate.getDate();
let month = currentDate.getMonth() + 1; 
let year = currentDate.getFullYear();

let formattedDate = `${month}/${getdate}/${year}`;

console.log(`Current date: ${formattedDate}`);
const date = formattedDate

const { id } = useParams()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleClose = (e) => {
    setOpen(false);
    setClose(true);
  };

  const handleOpen = (e) => {
    setOpen(true);
    setClose(false);
  };
  

  const { username, title } = formData;
  const URL = 'http://localhost:5000/note';
  const form = {...formData, date};

  const handleNote = async(e) => {
    e.preventDefault();
 
   
if(id){
    const res = await axios.put(`${URL}/${id}`, form);
    const data = res.data;
    getAllNote()
    setFormData({
        title: '',
        content: '',
    })
 navigate('/');
}else{
    const res = await axios.post(URL, form );
    const data = res.data;
   getAllNote()
    setFormData({
        title: '',
        content: '',
    })
    navigate('/');
}
  
  };

  const getAllNote = async() => {
    const res = await axios.get(URL);
    const data = res.data;
    console.log(data)
    localStorage.setItem('note', JSON.stringify(data))
    const getNote = JSON.parse(localStorage.getItem('note'));
    setNote(getNote)
  }

  const handleEdit = (id) => {
    const getNote = JSON.parse(localStorage.getItem('note'));
    const findNote = getNote.find((item) => item.id === id);
    setFormData({
        content: findNote.content,
        title: findNote.title,
    })
    navigate(`/${id}`)
  }

  const handleDelete = async(id) => {
    const getNote = JSON.parse(localStorage.getItem('note'));
    const findNote = getNote.find((item) => item.id === id);
    // ask for confirmation 
    const getConfirmation = window.confirm(
        "Are you sure you want to delete this Note"
      );

      if (getConfirmation) {
        const res = await axios.delete(`${URL}/${id}`);
        getAllNote()
      }

    
  }


  useEffect(()=> {
    getAllNote()
}, [])

  useEffect(()=> {
    const getNote = JSON.parse(localStorage.getItem('note'));
    setNote(getNote)
}, [added]);



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center mt-5 px-6 py-1 lg:px-8">
    <div className="shadow-lg">
        <div className="sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
         
<h2 className="m-5 text-center text-lg font-bold leading-4 tracking-tight text-gray-900">
           Note App
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-1/2 px-4 sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleNote}>

            
            {/* add icon  */}
            <div  onClick={handleOpen} className={`${open ? 'hidden': 'flex justify-center rounded-xl items-center bg-white py-2 px-4 gap-1 cursor-pointer'}  `}>
               <svg className="w-4 h-4 cursor-pointer" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256">
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><g><g><path fill="#000000" d="M124.1,10.8c-1,0.6-2.6,1.9-3.4,3l-1.5,2L119,67.4l-0.1,51.6H68c-56.6,0-53.2-0.2-56.4,3.9c-2.2,2.9-2.2,7.6,0,10.5c3.1,4.1-0.3,3.9,56.4,3.9h50.9V188c0,56.6-0.2,53.2,3.9,56.4c2.9,2.2,7.6,2.2,10.5,0c4.1-3.1,3.9,0.3,3.9-56.4v-50.9H188c56.6,0,53.2,0.2,56.4-3.9c2.2-2.9,2.2-7.6,0-10.5c-3.1-4.1,0.3-3.9-56.4-3.9h-50.9V68c0-56.5,0.2-53.2-3.8-56.3C130.8,9.9,126.8,9.4,124.1,10.8z"/></g></g></g>
                </svg> 
               <p className="text-black font-semibold text-sm">Add Note</p> 
                
            </div>

            <div className={`${open ? 'block': 'hidden'}`}>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
               <div className="flex justify-between items-cemter">
                <h1 className="text-sm">Title</h1>
                {/* close icon  */}
                <svg onClick={handleClose} className="w-6 h-6 cursor-pointer" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256" enable-background="new 0 0 256 256" >
                <metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
                <g><g><g><path fill="#000000" d="M116,10.5c-45.8,4.7-85.3,36.4-99.9,79.9c-8.1,24.4-8.1,50.4,0,75.1c2.8,8.6,10.1,23.1,15.2,30.2c20.3,28.5,50.9,46.4,85.2,49.8c43.5,4.4,86.7-16.4,110.6-53.4c22.4-34.6,25.1-78.9,7-115.9c-11.6-23.5-29.6-41.8-53-53.6C160.4,12.4,138.3,8.2,116,10.5z M137.3,15.9c28.1,2.4,52.5,14,72,34.2c14.5,15.1,24.4,33.7,28.8,54.2c5.2,24.4,2.1,49.3-8.8,71.9c-15.2,31.7-43.4,53.7-78.4,61.3c-9.6,2-27.6,2.6-37.9,1.1c-47.6-6.9-84.5-41.7-94.6-89.1c-1.5-6.9-1.6-8.6-1.6-21.6c-0.1-15.4,0.5-19.4,3.8-31.3c9.8-35.1,37.3-63.7,72.3-75.4C107.9,16.3,122,14.6,137.3,15.9z"/><path fill="#000000" d="M84.9,83c-2,0.8-2.7,3.2-1.6,5.9c0.7,1.4,7.3,8.6,19.4,20.6L121,128l-18.7,18.7c-20,20.1-21.2,21.6-19.1,24.8c1.3,2,3.4,2.4,5.8,1.2c1.1-0.6,10.3-9.3,20.5-19.4l18.5-18.4l18.7,18.6c19.5,19.4,21.5,21,24.4,19.4c0.7-0.4,1.5-1.2,1.9-1.9c1.6-2.9,0-4.9-19.4-24.4L134.9,128l18.4-18.5c10.1-10.1,18.8-19.3,19.4-20.4c1.2-2.4,0.8-4.5-1.2-5.8c-3.1-2-4.6-0.8-24.8,19.1L128,121l-18.5-18.3C97.4,90.6,90.3,84,88.9,83.3c-1.3-0.5-2.3-0.9-2.4-0.8C86.4,82.5,85.7,82.7,84.9,83z"/></g></g></g>
                </svg>
                </div> 
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  value={formData.title}
                  required
                  placeholder="Add A Title"
                  className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className={`${open ? 'flex flex-col': 'hidden'}`}>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Content
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="content"
                  name="content"
                  type="text" 
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="write anything"
                  className="block w-full rounded-md p-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
                
              </div>
            </div>

          
            <div className={`${open ? 'flex flex-col': 'hidden'}`}>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-800 hover:scale-110 duration-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                { id ? 'Update Note' : 'Add note'}
              </button>
            </div>
          </form>

            {
                note &&  Array.isArray(note) ? (
                    note.map((item) => (
                        <>
         <div key={item.id} className="p-2 bg-white rounded-xl mt-2">
                <div className="">
                <div className="flex pt-2 pr-2 pl-2 justify-between">
               <p className="text-sm text-black">{item.title}</p>
               <p className="text-xs text-gray-500">{item.date}</p>
                </div> 
    
                <div className="flex pb-2  pr-2 pl-2 justify-between">
                <p className="text-xs text-gray-500">{item.content}</p>
                <div className="flex">
                <svg onClick={() =>handleEdit(item.id)} className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    
                <svg onClick={() =>handleDelete(item.id)} className="w-5 h-5 cursor-pointer" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 482.428 482.429"
         >
    <g>
        <g>
            <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                V115.744z"/>
            <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
            <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
            <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
        </g>
    </g>
                    </svg>
                </div>
                </div>
                
                </div>
              
                
              </div>
                        </>
                     ))
                ) : (
                    <>
                    <div className="p-2 bg-white rounded-xl mt-5">
                <div className="">
                <div className="flex pt-2 pr-2 pl-2 justify-between">
               <p className="text-sm text-black">{note.title}</p>
               <p className="text-xs text-gray-500">{note.date}</p>
                </div> 
    
                <div className="flex pb-2  pr-2 pl-2 justify-between">
                <p className="text-xs text-gray-500">{note.content}</p>
                <div className="flex">
                <svg className="w-5 h-5 cursor-pointer" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    
                <svg className="w-5 h-5 cursor-pointer" fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 482.428 482.429"
         >
    <g>
        <g>
            <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                V115.744z"/>
            <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
                c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
            <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
                c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
            <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
                c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
        </g>
    </g>
                    </svg>
                </div>
                </div>
                
                </div>
              
                
              </div>
                    </>
                )
            }
          
          

         
        </div>
      </div>
      
    </div>
  );
};

export default Home;
