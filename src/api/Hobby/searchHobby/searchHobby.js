import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchHobby: async (_, args) =>
			prisma.hobbies({
				where: {
					OR: [
						{ title_contains: args.term },
						{ caption_contains: args.term },
						{ information_contains: args.term }
					]
				}
			})
	}
};
