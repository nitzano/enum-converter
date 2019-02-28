import express from 'express';
import morgan from 'morgan';
import apiRouter from './app/api';
import { apolloServer } from './app/schema/schema';

export const app = express();

// middleware
app.use(express.json());
app.use(morgan('tiny'));

// settings
app.set('json spaces', 2);

// routes
app.use('/api', apiRouter);

// graphql
apolloServer.applyMiddleware({ app, path: '/api/graphql' });

// static
app.use(express.static('static'));

app.use((err, req, res, next) => {
  res.status(err.status ? err.status : 500).json({ error: err.message });
  next(err);
});
