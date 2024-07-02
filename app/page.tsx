'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";

interface res extends Response {
  shortUrl?: string;
  qrCode?: string;
}

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [checker, setChecker] = useState('')

  const handleSubmit = async (e: any) => {
    console.log(originalUrl)
    e.preventDefault();
    let res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });
    
    res = await res.json();
    const returned: res = res;
    // console.log("returned: ", returned)
    // console.log('res params: ', res);
    // console.log("qrcode: ", returned.qrCode!)
    // console.log("shorturl: ", returned?.shortUrl)
    console.log("location: ", window.location.origin)
    
    setShortUrl(`${window.location.origin}/api/shorten/${returned?.shortUrl}`);
    setQrCode(returned.qrCode!);
    if(res.ok)
      alert('url successfully sent!');
      
    else
      alert('An Error occured!!!')
    


  };

const handleUrl = async() => {
  let res = await fetch(`/api/shorten/${shortUrl}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  
  res = await res.json();
  console.log("res: ", res);
}

  return (
    <div className="px-96 flex justify-center flex-col align-middle  w-full mt-10">
      <div className="text-center mb-10">
        <h1 className="font-sans font-bold text-5xl">URL MINIFAIA </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-5  text-center">
          <input className="border-2 border-gray-300 rounded-lg px-4 py-3 mr-16 w-full max-w-400px" type="text" placeholder="Enter your URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required name="url" id="url" />
            <button className="border-2 border-green-500 px-4 py-2 rounded-lg">submit</button>
      </form>
      <div className="mb-14">
          <button className="border-2 border-red-600 text-red-500 mr-3 rounded-lg px-4 py-2 bg-white font-sans" type="button" onClick={() => setChecker('url')}>minified url</button>
          <button className="border-2 border-blue-500 px-4 py-2 bg-white text-blue-500 hover:bg-blue-700 font-bold font-sans  rounded hover:shadow-lg transition duration-300" onClick={() => setChecker('qr')}>generate QR</button>
      </div>

      <div className="border-2 border-black p-10 flex place-content-center">
        {shortUrl.length > 0 && checker === "url" ? 
        (
          <a href={shortUrl} className="italic text-blue-800 font-serif" onClick={handleUrl}>{shortUrl}</a>
          ): qrCode.length >0 && checker === "qr" &&
          (
            <img src={qrCode} alt="QR Code" />
        )}
      </div>


    </div>
  );
}

export default Home;