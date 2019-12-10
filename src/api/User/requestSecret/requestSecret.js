import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
	Mutation: {
		requestSecret: async (_, args) => {
			const { email } = args;
			const emailSecret = generateSecret();
			try {
				await sendSecretMail(email, emailSecret);
				await prisma.updateUser({ data: { emailSecret }, where: { email } });
				return true;
			} catch (e) {
				console.log(e);
				return false;
			}
		}
	}
};
