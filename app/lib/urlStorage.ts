// import mysql from 'mysql'
import mysql from 'mysql2';
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

// export const pool = mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PW,
//     database: process.env.MYSQL_DB
// })

export const pool = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "$drmuz1kTrump",
  database: "url_shortner"
})