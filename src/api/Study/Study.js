import { prisma } from '../../../generated/prisma-client';

export default {
	Study: {
		user: ({ id }) => prisma.study({ id }).user()
	}
};
