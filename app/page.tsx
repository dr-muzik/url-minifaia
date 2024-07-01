'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e: any) => {
    console.log(originalUrl)
    e.preventDefault();
    let res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl }),
    });
    
    res = await res.json();
    console.log('res params: ', res);
    // setShortUrl(`${window.location.origin}/${res.shortUrl}`);
    // setQrCode(res.qrCode);
    if(res.ok)
      alert('url successfully sent!');
    
    else
      alert('An Error occured!!!')
    


  };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    // </main>
    <div className="p-5 ">
      <form onSubmit={handleSubmit}>

          <input className="border-2 border-gray-300 rounded-lg px-4 py-2 mr-8 w-full max-w-400px" type="text" placeholder="Enter your URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required name="url" id="url" />
          <button className="border-2 border-red-600 text-red-500 mr-3 rounded-lg px-4 py-2 bg-white" type="submit">shorten url</button>
          <button className="border-2 border-blue-500 px-4 py-2 bg-white text-blue-500 hover:bg-blue-700 font-bold  rounded hover:shadow-lg transition duration-300">generate QR</button>
      </form>

      {shortUrl && (
        <div>
          <p>Short URL: <a href={shortUrl}>{shortUrl}</a></p>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}

    </div>
  );
}

export default Home;