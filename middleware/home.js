// 路由中间件
export default function ({ route, redirect}) {
  if (route.path === '/') {
    return redirect('/home');
  }
}