import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchHobby: async (_, args) =>
			prisma.hobbies({
				where: {
					OR: [ { title_contains: args.term }, { area_contains: args.term } ]
				}
			})
	}
};
