export const cookieString = (cookieArray: any) =>
    cookieArray.map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; ');
