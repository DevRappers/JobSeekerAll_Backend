import { prisma } from '../../../generated/prisma-client';

export default {
	Hobby: {
		posts: ({ id }) => prisma.hobby({ id }).posts(),
		postsCount: ({ id }) => prisma.postsConnection({ where: { user: { id } } }).aggregate().count(),
		user: ({ id }) => prisma.hobby({ id }).user()
	}
};
