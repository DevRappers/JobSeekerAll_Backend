import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
	Mutation: {
		confirmSecret: async (_, args) => {
			const { secret, email } = args;
			const user = await prisma.user({ email });
			if (user.emailSecret === secret) {
				// 시크릿코드가 맞으면 firstLogin을 1로 설정하고 시크릿코드를 초기화시켜줌
				await prisma.updateUser({ data: { firstLogin: '1', emailSecret: '' }, where: { email } });
				return generateToken(user.id);
			} else {
				throw Error('이메일/비밀값의 조합이 잘못되었습니다.');
			}
		}
	}
};
