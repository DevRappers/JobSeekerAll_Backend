import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeFullStudy: (_, args) => {
			const { id } = args;
			return prisma.study({ id });
		}
	}
};
