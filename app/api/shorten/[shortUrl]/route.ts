import { getUrls, pool } from '@/app/lib/urlStorage';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation'
import { QueryResult } from 'mysql2';
import { OkPacket } from 'mysql';
// import dbConnect from '../../lib/dbConnect';
// import Url from '../../models/Url';

interface db extends OkPacket {
  id: number,
  originalUrl: string,
  shortUrl: string
}

export  async function GET(req: NextApiRequest, res: any) {
  const {shortUrl} = await res.params;


try {
  
  const query = 
  `
  SELECT  * FROM new_table WHERE shortUrl = ?
  `
  const value = [shortUrl];

    const result: any = await new Promise((resolve, reject) => {
      pool.query(query, value, (err, results)=> {
        if(err)
          reject(err);
        else
          resolve(results);
      });
    });
   

    const  { originalUrl } = result[0];
    console.log("outside promise: ", originalUrl);

    return NextResponse.json({
      ok: true,
      message: "success",
      originalUrl
      // originalUrl: originalUrl, 
      }, {status: 200});
    // redirect(originalUrl);
  } catch (err) {
    console.error("Database query failed:", err);
    return NextResponse.json({
      ok: false,
      message: "Database query failed",
    });
  }
  }
