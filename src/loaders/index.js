import expressLoader from './express.js';
import mongooseLoader from './db.js';

export default async expressApp => {
    expressLoader(expressApp);
    console.log('Express initialized');
    //try to create connection
    await mongooseLoader.getConnection();
    console.log('MongoDB Intialized');

};
