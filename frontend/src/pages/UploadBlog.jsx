import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import JoditEditor from 'jodit-react';
import { api_base_url } from '../helper';

const UploadBlog = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [image, setImage] = useState("");

  const editor = useRef(null);
	const [content, setContent] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    fetch(api_base_url + "/uploadBlog",{
      mode: "cors",
      method: "POST",
      body: formData,
    }).then((res) => res.json()).then(data=>{
      if(data.success){
        alert("Blog created successfully");
        setTitle("");
        setDesc("");
        setContent("");
        setImage("");
        setError("");
      }
      else{
        setError(data.msg)
      }
    })
  }

  return (
    <>
      {
        !isLoggedIn ?
          <>
            <div className="con flex items-center justify-center flex-col h-screen">
              <div className='w-[25vw] h-[fit] flex flex-col rounded-xl p-[20px] bg-[#0F0E0E]'>
                <h3 className='text-2xl mb-4'>Please log in to upload a blog</h3>
                <p className='text-[gray] text-[14px]'>You must be logged in as an admin to access this page.</p>
              </div>
            </div>
          </> : <>
            <Navbar />
            <div className='px-[100px]'>
              <h3>Upload Blog</h3>

              <form onSubmit={submitForm}>
                <div className="inputBox">
                  <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter title' />
                </div>

                <div className="inputBox">
                  <textarea onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder='Enter Descriptin'></textarea>
                </div>

                <JoditEditor
                  ref={editor}
                  className='text-black mt-2'
                  value={content}
                  tabIndex={1} // tabIndex of textarea
                  onChange={newContent => setContent(newContent)}
                />

                <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" className='my-3' onChange={(e)=>{setImage(e.target.files[0])}} id='file' /> <br />

                <p className='text-red-500 text-[13px] mt-1'>{error}</p>
                <button className="btnNormal mt-3">Create Blog</button>
              </form>
            </div>
          </>
      }
    </>
  )
}

export default UploadBlog