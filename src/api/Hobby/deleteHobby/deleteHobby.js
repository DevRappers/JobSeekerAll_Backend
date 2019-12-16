import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		deleteHobby: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			const hobby = await prisma.$exists.hobby({ id, user: { id: user.id } });

			if (hobby) {
				await prisma.deleteHobby({ id });
				return true;
			} else {
				return false;
			}
		}
	}
};
