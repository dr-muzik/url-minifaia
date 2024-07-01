import { getUrls } from '@/app/lib/urlStorage';
import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '../../lib/dbConnect';
// import Url from '../../models/Url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

  const { shortUrl } = req.query;
//   const url = await Url.findOne({ shortUrl });
    const url = getUrls();
    if(url.some(el => el.shortUrl === shortUrl)){
        // res.redirect(shortUrl as string);
        console.log('shorturl: ', shortUrl as string)
    } else {
      // res.status(404).json({ message: 'URL not found' });
      console.log('URL not found...')
    }
  }
