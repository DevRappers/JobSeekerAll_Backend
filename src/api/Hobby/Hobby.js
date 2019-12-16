import { prisma } from '../../../generated/prisma-client';

export default {
	Hobby: {
		posts: ({ id }) => prisma.hobby({ id }).posts(),
		comments: ({ id }) => prisma.hobby({ id }).comments(),
		postsCount: ({ id }) => prisma.postsConnection({ where: { hobby: { id } } }).aggregate().count(),
		user: ({ id }) => prisma.hobby({ id }).user(),
		isMyHobby: async (parent, _, { request }) => {
			const { id } = parent;
			const { user } = request;
			return await prisma.$exists.hobby({
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						id
					}
				]
			});
		},
		commentCount: (parent) =>
			prisma
				.commentsConnection({
					where: { hobby: { id: parent.id } }
				})
				.aggregate()
				.count()
	}
};
