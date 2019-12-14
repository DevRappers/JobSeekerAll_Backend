import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		deleteUser: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const exuser = await prisma.$exists.user({ id: user.id });

			if (exuser) {
				await prisma.deleteUser({ id: user.id });
				return true;
			} else {
				return false;
			}
		}
	}
};
