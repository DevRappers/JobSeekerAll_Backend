import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
	Mutation: {
		editHobby: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id, title, caption, area, proImage, information } = args;
			const { user } = request;
			const hobby = await prisma.$exists.hobby({ id, user: { id: user.id } });

			if (hobby) {
				await prisma.updateHobby({
					data: { title, caption, area, proImage, information },
					where: { id }
				});
				return true;
			} else {
				throw Error('오류발생! 해당하는 모임이 없습니다.');
				return false;
			}
		}
	}
};
