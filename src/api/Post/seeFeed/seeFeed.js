import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeFeed: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { hId } = args;

			return prisma.post({
				where: {
					hobby: {
						id: hId
					}
				},
				orderBy: 'createdAt_DESC'
			});
		}
	}
};
