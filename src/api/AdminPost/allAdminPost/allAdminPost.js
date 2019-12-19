import { prisma } from '../../../../generated/prisma-client';

export default {
	Query: {
		allAdminPost: () => prisma.adminPosts({ orderBy: 'createdAt_DESC' })
	}
};
