import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		addComment: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { text, hobbyId } = args;
			const { user } = request;
			try {
				await prisma.createComment({
					user: {
						connect: {
							id: user.id
						}
					},
					hobby: {
						connect: {
							id: hobbyId
						}
					},
					text
				});
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}
};
