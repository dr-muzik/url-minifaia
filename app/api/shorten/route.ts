import { addUrl, getUrls, pool } from '@/app/lib/urlStorage';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest ,NextResponse } from 'next/server';
import { resolve } from 'path';
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
 
  const { originalUrl } = await req.json();
  console.log(originalUrl)
  const shortUrl = uuidv4().substring(0, 16);
  const qrCode = await QRCode.toDataURL(`${req.headers}/${shortUrl}`);

  try {
    const query = `
      INSERT INTO new_table (originalUrl, shortUrl) VALUE (?, ?) 
    `;
    const value = [originalUrl, shortUrl]
    const result = await new Promise((resolve, reject) => {
      pool.query(query, value, (err, results: [])=> {
        if(err)
          reject(err);
        else
          resolve(results);
      });
    });

    console.log("result from post: ", result);

    return NextResponse.json({
      ok: true,
      message: "success",
      urls: {
        originalUrl,
        qrCode,
        shortUrl
    }
    },{status: 201});
  } catch (err) {
    console.error("Database query failed:", err);
    return NextResponse.json({
      ok: false,
      message: "Database query failed",
    }, {status: 500});
  }

}



export const GET = async (req: Request) => {

  try {
    const query = `
      SELECT * FROM new_table 
    `;

    const result = await new Promise((resolve, reject) => {
      pool.query(query, (err, results: [])=> {
        if(err)
          reject(err);
        else
          resolve(results);
      });
    });
    // const originalUrl = result.rows[0]?.original_url;

    console.log("result from query: ", result);

    return NextResponse.json({
      ok: true,
      message: "success",
      // originalUrl: originalUrl, 
    });
  } catch (err) {
    console.error("Database query failed:", err);
    return NextResponse.json({
      ok: false,
      message: "Database query failed",
    });
  }

}

