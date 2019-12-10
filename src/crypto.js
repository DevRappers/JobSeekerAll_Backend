const crypto = require('crypto');
const PASS_KEY = 'devrappersKeyJobSeekerAll';

export const cipherPass = (password) => {
	const cipher = crypto.createCipher('aes-256-cbc', PASS_KEY);
	let result = cipher.update(password, 'utf8', 'base64');
	result += cipher.final('base64');

	return result;
};

export const decipherPass = (password) => {
	const decipher = crypto.createDecipher('aes-256-cbc', PASS_KEY);
	let result2 = decipher.update(password, 'base64', 'utf8'); // 암호화할문 (base64, utf8이 위의 cipher과 반대 순서입니다.)
	result2 += decipher.final('utf8'); // 암호화할문장 (여기도 base64대신 utf8)
	return result2;
};

export const confirmPass = (cryptoPass, password) => {
	if (cryptoPass === password) {
		return true;
	} else {
		return false;
	}
};
