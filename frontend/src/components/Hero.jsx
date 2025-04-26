import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImg from "../images/hero.gif";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero flex items-center justify-between px-[100px]" style={{ height: "calc(100vh - 100px)" }}>
      <div className="left w-[50%]">
        <h3 className='text-[50px]' style={{ lineHeight: 1 }}>
          Your ideas deserve more than drafts. <span className='sp-text'> Publish </span>them to the world.
        </h3>
        <div className="flex mt-6 items-center gap-[15px]">
          <button className='btnNormal' onClick={() => navigate("/UploadBlog")}>Get Started</button>
          <button className='btnWhite' onClick={() => navigate("/learnmore")}>Learn More</button>
        </div>
      </div>
      <div className="right w-[40%]">
        <img className='rounded-[20px] w-full' src={heroImg} alt="Hero GIF" />
      </div>
    </div>
  );
};

export default Hero;
