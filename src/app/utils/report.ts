import { isExceptionUser } from './user-exceptions';

const randomNumber = Math.floor(Math.random() * 1000) + 1

export const getReports = (user?: { email: string; role?: { id?: number } }) => {
	const isException = isExceptionUser(user);

	return {}
}
