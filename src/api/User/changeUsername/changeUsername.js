import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		changeUsername: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { username } = args;
			const { user } = request;

			try {
				await prisma.updateUser({
					where: {
						id: user.id
					},
					data: {
						username
					}
				});

				return true;
			} catch (e) {
				return false;
			}
		}
	}
};
