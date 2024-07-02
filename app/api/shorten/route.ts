import { addUrl, getUrls } from '@/app/lib/urlStorage';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest ,NextResponse } from 'next/server';
// import dbConnect from '../../lib/dbConnect';
// import Url from '../../models/Url';
// import shortid from 'shortid';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

interface UrlRequest extends NextApiRequest {
  body: {
    originalUrl: string;
  }
}


export const POST = async (req: Request) => {
    // const urlArr = []

  const { originalUrl} = await req.json();
  console.log(originalUrl)
  const shortUrl = uuidv4().substring(0, 16);
  const qrCode = await QRCode.toDataURL(`${req.headers}/${shortUrl}`);

  
  const newUrl = {
    originalUrl,
    shortUrl,
    qrCode,
  };

  addUrl(newUrl);

  // console.log(getUrls())


//   await newUrl.save();

  // res.status(201).json({ shortUrl,qrCode });
  if(!originalUrl) 
    return NextResponse.json({
      error: "required field not found",
      ok: false,
      status: 400
  })

  return NextResponse.json(
    { message: 'Successfully delivered',
      ok: true,
      shortUrl,
      qrCode
     },
     {
      status: 201,}
  )
}

