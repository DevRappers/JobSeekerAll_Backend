import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		seeFullHobby: (_, args) => {
			const { id } = args;
			return prisma.hobby({ id });
		}
	}
};
