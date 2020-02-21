import React          from 'react'
import { Header, Iconfont } from '../../components'
import { HOME_MENU }        from '../../constants'

const {
        User: UserMenu
      }     = HOME_MENU
const title = UserMenu.name

function User() {
  return (
    <>
      <Header title={title}/>
    </>
  )
}

User.navigationOptions = {
  headerShown: false,
  tabBarIcon:  ({ tintColor }) => <Iconfont Icons={UserMenu.Icons} name={UserMenu.icon} color={tintColor}/>,
  tabBarLabel: title
}

export default User
