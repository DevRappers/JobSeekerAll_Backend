import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		upload: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { user } = request;
			const { caption, title, files, hId } = args;

			const existHobby = prisma.$exists.hobby({ id: hId, user: { id: user.id } });

			if (existHobby) {
				const post = await prisma.createPost({
					caption,
					title,
					hobby: {
						connect: {
							id: hId
						}
					},
					user: {
						connect: {
							id: user.id
						}
					}
				});
				// 파일 목록 생성
				files.forEach(async (file) => {
					await prisma.createFile({
						url: file,
						post: {
							connect: {
								id: post.id
							}
						}
					});
				});
				return true;
			} else {
				throw Error('권한이없습니다.');
			}
		}
	}
};
