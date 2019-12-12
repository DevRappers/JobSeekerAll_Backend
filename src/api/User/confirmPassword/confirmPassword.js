import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';
import { decipherPass } from '../../../crypto';

export default {
	Mutation: {
		confirmPassword: async (_, args) => {
			const { email, password } = args;
			const user = await prisma.user({ email });
			const decipherPassword = decipherPass(user.password);

			if (decipherPassword === password) {
				await prisma.updateUser({
					where: {
						id: user.id
					},
					data: {
						emailSecret: ''
					}
				});
				if (user.firstLogin === '1') {
					return generateToken(user.id);
				} else {
					return '2';
				}
			} else {
				return '3';
				throw Error('비밀번호가 잘못되었습니다.');
			}
		}
	}
};
