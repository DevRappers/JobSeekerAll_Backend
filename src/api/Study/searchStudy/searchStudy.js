import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchStudy: async (_, args) =>
			prisma.studies({ where: { title_contains: args.term }, orderBy: 'createdAt_DESC' })
	}
};
