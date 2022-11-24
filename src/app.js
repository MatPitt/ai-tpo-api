import express from 'express';
import loaders from './loaders/index.js';
import config from "./config.js";

async function startServer() {
    const app = express();
    //Console.log("processENV",process.env);
    if (process.env.NODE_ENV === 'Development') {
        config();
    }
    loaders(app).catch(e => {
        console.log('AN ERROR OCCURED!');
        throw e; // TODO: sensible error handling
    });
}

startServer();
