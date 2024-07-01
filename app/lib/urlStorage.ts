interface Url {
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
  }
  
  const urlArr: Url[] = [];
  
  export const addUrl = (url: Url) => {
    urlArr.push(url);
  }
  
  export const getUrls = () => {
    return urlArr;
  }