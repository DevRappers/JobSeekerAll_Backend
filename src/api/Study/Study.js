import { prisma } from '../../../generated/prisma-client';

export default {
	Study: {
		user: ({ id }) => prisma.study({ id }).user(),
		isMyStudy: async (parent, _, { request }) => {
			const { id } = parent;
			const { user } = request;
			return await prisma.$exists.study({
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
		}
	}
};
