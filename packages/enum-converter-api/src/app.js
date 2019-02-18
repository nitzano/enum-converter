import express from 'express';
import morgan from 'morgan';
import apiRouter from './app/api';
import { join } from 'path';

// create the app
export const app = express();

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// settings
app.set('json spaces', 2);

// routes
app.use('/api', apiRouter);

// react
const reactBuildFolder = join(__dirname, '../../enum-server-web/build');
console.log(`Serving static from ${reactBuildFolder}`);
app.use(express.static(reactBuildFolder));

// static
app.use(express.static('static'));

app.use((err, req, res, next) => {
  res.status(err.status ? err.status : 500).json({ error: err.message });
  next(err);
});
