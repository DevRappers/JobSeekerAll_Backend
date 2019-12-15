import { prisma } from '../../../generated/prisma-client';

export default {
	User: {
		posts: ({ id }) => prisma.user({ id }).posts(),
		myStudy: ({ id }) => prisma.user({ id }).myStudy({ orderBy: 'studyEnd_ASC' }),
		myHobby: ({ id }) => prisma.user({ id }).myHobby(),
		likes: ({ id }) => prisma.user({ id }).likes(),
		comments: ({ id }) => prisma.user({ id }).comments(),
		chatRoom: ({ id }) => prisma.user({ id }).rooms(),
		isSelf: (parent, _, { request }) => {
			const { user } = request;
			const { id: parentId } = parent;
			return user.id === parentId;
		}
	}
};
