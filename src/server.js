import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import './env';
import { uploadMiddleware, uploadController } from './upload';
import express from 'express';
// env에 PORT가 지정되어 있지 않다면 4000번으로 설정
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

server.start({ port: PORT }, () => console.log(`취준왕 Server running on http://localhost:${PORT}💙`));
