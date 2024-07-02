import { getUrls } from '@/app/lib/urlStorage';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
// import dbConnect from '../../lib/dbConnect';
// import Url from '../../models/Url';

export  async function GET(req: NextApiRequest, res: any) {
//   await dbConnect();

//   const { shortUrl } = req.query;
  const {shortUrl} = await res.params;
//   const url = await Url.findOne({ shortUrl });
console.log("shortUrl: ", shortUrl)
    const url = getUrls();
    // url.forEach(obj => console.log(obj));
    // console.log(url.some(el => el.shortUrl === shortUrl))
    if(!url.some(el => el.shortUrl === shortUrl)){
        // res.redirect(shortUrl as string);
        console.log('shorturl: ', shortUrl)
        return NextResponse.json({
            ok: true,
            message: "Found url!"
        })
    } else {
      // res.status(404).json({ message: 'URL not found' });
      console.log('URL not found...')
      return NextResponse.json({
        ok: false,
        message: "url not found ..."
    })
    }
  }
