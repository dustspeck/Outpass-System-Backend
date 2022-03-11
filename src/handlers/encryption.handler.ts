import NodeRSA from 'node-rsa';

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

let rsa: NodeRSA | null = null;

try {
	rsa = new NodeRSA(PRIVATE_KEY);
} catch (error) {
	console.log(error);
}

export const encryptData = (data: string) => {
	if (!rsa) return null;
	try {
		const enc_data = rsa.encryptPrivate(`${data}`, 'base64');
		return enc_data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const decryptData = (data: string) => {
	if (!rsa) return null;
	try {
		const dec_data = rsa.decryptPublic(`${data}`, 'utf8');
		return dec_data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const exportPublicKey = () => {
	if (!rsa) return null;
	try {
		const public_key = rsa.exportKey('public');
		return public_key;
	} catch (error) {
		console.log(error);
		return null;
	}
};

// -----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjpCTYNEdHhcXN1pv1L+yw7u1y
// u0AQQXqe0mE7bdT7TRyiM5o5lr63DoDm5g0Qt0fGvQ1NDvX5xVw62psbzn36kNZV
// ihgGMHY2FDwstnw4uwk2Pjw71aDMJXbZo8wyeRbNA35fo9PeeYLbqGlFEYbZoRea
// unXfPTl5NkA6BT+sJQIDAQAB
// -----END PUBLIC KEY-----
