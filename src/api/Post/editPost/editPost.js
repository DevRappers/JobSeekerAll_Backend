import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		editPost: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id, caption, title, file } = args;
			const { user } = request;
			const post = await prisma.$exists.post({ id, user: { id: user.id } });
			if (post) {
				await prisma.updatePost({
					data: { caption, title },
					where: { id }
				});

				await prisma.updateFile({
					data: { url: file },
					where: {
						post: {
							id
						}
					}
				});
				return true;
			} else {
				return false;
				throw Error('삭제실패');
			}
		}
	}
};
