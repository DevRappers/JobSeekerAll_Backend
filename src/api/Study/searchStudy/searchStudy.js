import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		searchStudy: async (_, args) =>
			prisma.studies({
				where: {
					OR: [ { title_contains: args.term }, { job_contains: args.term } ]
				},
				orderBy: 'studyEnd_ASC'
			})
	}
};
