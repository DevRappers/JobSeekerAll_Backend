import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createStudy: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { title, caption, information, job, area, startTime, endTime } = args;
			const { user } = request;

			// study의 title이름이 중복되는지 확인함
			const existsStudy = await prisma.$exists.study({ title });

			// 중복된 계정정보가 있을 경우 Error 발생
			if (existsStudy) {
				throw Error('해당 스터디명은 현재 사용중입니다. 다른 이름을 사용해주세요.');
			}

			// new study create
			await prisma.createStudy({
				title,
				caption,
				information,
				job,
				area,
				startTime,
				endTime,
				user: {
					connect: {
						id: user.id
					}
				}
			});

			return true;
		}
	}
};
