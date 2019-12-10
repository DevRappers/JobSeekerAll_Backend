import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		sortHobby: async (_, args) =>
			prisma.studies({
				where: {
					OR: [ { job_contains: args.job }, { area_contains: args.area } ]
				}
			})
	}
};
