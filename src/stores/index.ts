//1.创建pinia实例
import { createPinia } from 'pinia'
import presist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
//2.使用pinia插件
pinia.use(presist)

export default pinia
// import { useUserStore } from './modules/user'
// export { useUserStore }

export * from './modules/user'
