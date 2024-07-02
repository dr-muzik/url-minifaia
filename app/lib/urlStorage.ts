interface Url {
    originalUrl: string;
    shortUrl: string;
    qrCode: string;
  }
  
  export const urlArr: Url[] = [{
    originalUrl: "testing-out-this-temp-db",
    shortUrl: "00be88-298fflsk-3",
    qrCode: "images/png/2983jslkjdfknsdf-s;ldkjfkwen/;skdjfl"
  }];
  
  export const addUrl = (url: Url) => {
    return urlArr.push(url);
  }
  
  export const getUrls = () => {
    return urlArr;
  }