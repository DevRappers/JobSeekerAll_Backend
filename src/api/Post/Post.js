import { prisma } from '../../../generated/prisma-client';

export default {
	Post: {
		files: ({ id }) => prisma.post({ id }).files(),
		user: ({ id }) => prisma.post({ id }).user(),
		likes: ({ id }) => prisma.post({ id }).likes(),
		hobby: ({ id }) => prisma.post({ id }).hobby(),
		isMyPost: async (parent, _, { request }) => {
			const { id } = parent;
			const { user } = request;
			return await prisma.$exists.post({
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
		isLiked: async (parent, _, { request }) => {
			const { user } = request;
			const { id } = parent;
			return prisma.$exists.like({
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						post: {
							id
						}
					}
				]
			});
		},
		likeCount: (parent) =>
			prisma
				.likesConnection({
					where: { post: { id: parent.id } }
				})
				.aggregate()
				.count()
	}
};
