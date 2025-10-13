export interface User {
	email: string;
	role?: { id?: number; permissions?: any };
}

// Lista de excepciones personalizadas
const exceptionUsers: { email: string; roleId?: number }[] = [
	{ email: 'mario.corado@claro.com.gt', roleId: 7 },
	{ email: 'mario.corado@claro.com.gt', roleId: 7 },
	{ email: 'astrid.gonzalez@pentcloud.com', roleId: 7 },
	// Agrega más si lo necesitás
];

export const isExceptionUser = (user?: User): boolean => {
	if (!user) return false;

	return exceptionUsers.some(
		(exception) =>
			exception.email === user.email &&
			(exception.roleId === undefined || exception.roleId === user.role?.id)
	);
};
