import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		deleteStudy: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;
			const study = await prisma.$exists.study({ id, user: { id: user.id } });

			if (study) {
				await prisma.deleteStudy({ id });
				return true;
			} else {
				return false;
			}
		}
	}
};
