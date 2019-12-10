import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
	Mutation: {
		endStudy: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { id } = args;
			const { user } = request;

			const study = await prisma.$exists.study({ id, user: { id: user.id } });

			if (study) {
				return prisma.updateStudy({
					data: { studyEnd: '2' },
					where: { id }
				});
			} else {
				throw Error('오류발생! 해당하는 스터디가 없습니다.');
			}
		}
	}
};
