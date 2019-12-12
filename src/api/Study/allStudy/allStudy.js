import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		allStudy: () => prisma.studies({ orderBy: 'createdAt_DESC' })
	}
};
