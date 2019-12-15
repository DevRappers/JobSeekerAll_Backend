import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
	Mutation: {
		editStudy: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id, title, caption, information, job, area, time } = args;
			const { user } = request;

			const study = await prisma.$exists.study({ id, user: { id: user.id } });

			if (study) {
				await prisma.updateStudy({
					data: { title, caption, information, job, area, time },
					where: { id }
				});
				return true;
			} else {
				throw Error('오류발생! 해당하는 스터디가 없습니다.');
				return false;
			}
		}
	}
};
