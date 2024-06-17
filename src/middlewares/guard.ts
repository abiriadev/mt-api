// NOTE: 타입 정보 날려도 됨
export const guardOptions = {
	security: [
		{
			Bearer: [],
		},
	],
	errors: {
		401: '로그인 필요',
	},
}
