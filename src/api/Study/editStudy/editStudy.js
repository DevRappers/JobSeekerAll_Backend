import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
	Mutation: {
		editStudy: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id, title, caption, information, job, area, time, action } = args;
			const { user } = request;

			const study = await prisma.$exists.study({ id, user: { id: user.id } });

			if (study) {
				if (action === EDIT) {
					return prisma.updateStudy({
						data: { title, caption, information, job, area, time },
						where: { id }
					});
				} else if (action === DELETE) {
					return prisma.deleteStudy({ id });
				}
			} else {
				throw Error('오류발생! 해당하는 스터디가 없습니다.');
			}
		}
	}
};
