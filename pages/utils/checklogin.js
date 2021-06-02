const Cookie = process.client ? require('js-cookie') : undefined;

export const checkLogin = () => {
  const data = Cookie.get('user');
  return !!data
}