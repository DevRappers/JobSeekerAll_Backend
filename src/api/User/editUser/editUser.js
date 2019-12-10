import { prisma } from '../../../../generated/prisma-client';
import { cipherPass } from '../../../crypto';

export default {
	Mutation: {
		editUser: (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request);
			const { username, avatar, password, email, area, department, phoneNumber } = args;
			const { user } = request;

			// 비밀번호 암호화
			const newPassword = password === '' ? password : cipherPass(password);

			return prisma.updateUser({
				where: {
					id: user.id
				},
				data: {
					username,
					avatar,
					password: newPassword,
					email,
					area,
					department,
					phoneNumber
				}
			});
		}
	}
};
