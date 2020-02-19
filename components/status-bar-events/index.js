import React                from 'react'
import { StatusBar }        from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS }              from '../../constants'
import * as styles          from '../../styles'

export default function StatusBarEvents({
  backgroundColor,
  barStyle,
  translucent,
  animated,
  action
}) {
  const events = () => {
    if (!IOS) {
      StatusBar.setBackgroundColor(backgroundColor, animated)
      StatusBar.setTranslucent(translucent)
    }
    StatusBar.setBarStyle(barStyle, animated)
  }
  const props  = {
    onDidFocus: () => events()
  }
  if (action === 'onWillFocus') {
    props.onWillFocus = () => events()
  }
  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
        animated={animated}
      />
      <NavigationEvents {...props} />
    </>
  )
}

StatusBarEvents.defaultProps = {
  backgroundColor: styles.full_base,
  barStyle:        'dark-content',
  translucent:     !IOS,
  animated:        IOS,
  action:          'onDidFocus'
}
