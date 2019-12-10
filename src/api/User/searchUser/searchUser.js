import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchUser: async (_, args) =>
			prisma.users({
				where: {
					OR: [
						{ username_contains: args.term },
						{ area_contains: args.term },
						{ department_contains: args.term }
					]
				}
			})
	}
};
