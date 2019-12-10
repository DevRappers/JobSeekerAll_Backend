import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		sortHobby: async (_, args) =>
			prisma.hobbies({
				where: {
					area_contains: args.area
				}
			})
	}
};
