import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		createHobby: async (_, args, { request }) => {
			const { title, caption, information, area, proImage = '' } = args;
			const { user } = request;

			// hobby의 title 취미모임의 이름이 중복되는지 확인함
			const existsHobby = await prisma.$exists.hobby({ title });

			// 중복된 계정정보가 있을 경우 Error 발생
			if (existsHobby) {
				throw Error('해당 모임이름은 현재 사용중입니다. 다른 이름을 사용해주세요.');
			}

			// new hobby create
			await prisma.createHobby({
				title,
				caption,
				information,
				area,
				proImage,
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
