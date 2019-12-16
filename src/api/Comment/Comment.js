import { prisma } from '../../../generated/prisma-client';

export default {
	Comment: {
		user: ({ id }) => prisma.comment({ id }).user(),
		hobby: ({ id }) => prisma.comment({ id }).hobby(),
		isMyComment: async (parent, _, { request }) => {
			const { id } = parent;
			const { user } = request;
			return await prisma.$exists.comment({
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
