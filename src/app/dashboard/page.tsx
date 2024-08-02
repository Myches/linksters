'use client'

import { useAuth } from "../context/authContext";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const { 
    linkForms, 
    setLinkForms, 
    saveAllLinks, 
    updateLinkForm, 
    removeLinkForm, 
    addNewLinkForm 
  } = useAuth();
  
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  const validateUrl = (url: string, platform: string): boolean => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[\da-z\.-]+\.[a-z\.]{2,6}([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      return false;
    }

    const platformDomains: { [key: string]: string } = {
      Github: 'github.com',
      Youtube: 'youtube.com',
      Twitter: 'twitter.com',
      Linkedin: 'linkedin.com',
      Twitch: 'twitch.tv',
      Facebook: 'facebook.com',
      Stackoverflow: 'stackoverflow.com',
      Codewars: 'codewars.com',
      Hashnode: 'hashnode.com',
      Freecodecamp: 'freecodecamp.org'
    };

    const domain = platformDomains[platform];
    const cleanUrl = url.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
    return cleanUrl.startsWith(domain.toLowerCase());
  };

  const handleSaveAll = () => {
    let hasErrors = false;
    const newErrors: { [key: number]: string } = {};

    linkForms.forEach(form => {
      if (!validateUrl(form.url, form.platform)) {
        newErrors[form.id] = `Invalid URL for ${form.platform}`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      saveAllLinks();
      setErrors({});
    }
  };

  return (
    <div className="h-full bg-white p-4 lg:ml-2 overflow-y-auto">
      <h1 className="text-[32px] text-gray-700 font-bold">Customize your links</h1>
      <p className="text-[16px] text-gray-400">Add/edit/remove links below and then share all your profiles to the world</p>
      <button className="w-full h-[46px] border border-violet-400 p-2 border-[2px] text-[16px] text-violet-400 mt-4 hover:bg-violet-600 hover:text-white" onClick={addNewLinkForm}>+ Add new link</button>
      
      {linkForms.map((linkForm) => (
        <div key={linkForm.id} className="mt-4 p-4 text-[16px] pb-14 text-gray-500 border rounder-lg bg-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <Image src="/images/Frame 248.png" width={12} height={1} alt="address logo" />
              <p className="pl-2">Link #{linkForm.id}</p>
            </div>
            <button onClick={() => removeLinkForm(linkForm.id)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
          <div>
            <label htmlFor={`platform-${linkForm.id}`} className="pt-4 text-[12px]">Platform</label>
            <div className="bg-white flex space-x-4 border rounded-lg px-4">
              <span className=" flex justify-center items-center">
                <Image src="/images/Vector.png" width={13} height={14} alt="address logo" />
              </span>
              <select
                id={`platform-${linkForm.id}`}
                className="w-full h-[48px] focus:outline-none"
                value={linkForm.platform}
                onChange={(e) => updateLinkForm(linkForm.id, 'platform', e.target.value)}
              >
                <option value="Github">Github</option>
                <option value="Youtube">Youtube</option>
                <option value="Twitter">Twitter</option>
                <option value="Linkedin">LinkedIn</option>
                <option value="Twitch">Twitch</option>
                <option value="Facebook">Facebook</option>
                <option value="Stackoverflow">Stack Overflow</option>
                <option value="Codewars">Codewars</option>
                <option value="Hashnode">Hashnode</option>
                <option value="Freecodecamp">freeCodeCamp</option>
              </select>
            </div>
          </div>
          <label htmlFor={`link-${linkForm.id}`} className="mt-6 text-[12px]">Link</label>
          <div className="bg-white flex space-x-4 border rounded-lg px-4">
            <span className="flex justify-center items-center">
              <Image src="/images/ph_link-bold.png" width={16} height={16} alt="address logo" />
            </span>
            <input
              type="text"
              id={`link-${linkForm.id}`}
              placeholder={`eg. https://${linkForm.platform.toLowerCase()}.com`}
              value={linkForm.url}
              onChange={(e) => updateLinkForm(linkForm.id, 'url', e.target.value)}
              className={`focus:outline-none text-gray-400 px-4 w-full h-[48px] text-[16px] ${errors[linkForm.id] ? 'border-red-500' : ''}`}
            />
          </div>
        
          {errors[linkForm.id] && (
            <p className="text-red-500 text-sm mt-1">{errors[linkForm.id]}</p>
          )}
        </div>
      ))}
      
      <button 
        className="float-right  bg-blue-600 text-white p-2 px-4 border rounded-lg text-[16px] mt-4 hover:bg-gray-500"
        onClick={handleSaveAll}
      >
        Save 
      </button>
    </div>
  )
}