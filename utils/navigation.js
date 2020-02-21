/**
 * 全局导航跳转
 */
export default class Navigation {
  static navigation

  /**
   * 设置 navigation
   * @param navigation
   */
  static setNavigation(navigation) {
    if (Navigation.navigation) return
    Navigation.navigation = navigation
  }

  /**
   * 返回上一页
   */
  static goBack(navigation) {
    if (!navigation) {
      console.log('goBack：navigation 未传')
      return
    }
    navigation.goBack()
  }

  /**
   * 重置到首页
   */
  static resetToHome(navigation) {
    if (!navigation) {
      console.log('resetToHome：navigation 未传')
      return
    }
    navigation.navigate('Home')
  }

  /**
   * 跳转到指定页面
   * @param page 跳转页面名
   * @param params 传递的参数
   */
  static goPage(page, params) {
    const navigation = Navigation.navigation
    if (!navigation) {
      console.log('goPage：navigation 不存在')
      return
    }
    navigation.navigate(page, { ...params })
  }
}
