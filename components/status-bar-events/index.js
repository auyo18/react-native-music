import React, { memo }      from 'react'
import { StatusBar }        from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { IOS }              from '../../constants'
import * as styles          from '../../styles'
import PropTypes            from 'prop-types'

const StatusBarEvents = memo(function ({
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
})

StatusBarEvents.defaultProps = {
  backgroundColor: styles.full_base,
  barStyle:        'dark-content',
  translucent:     !IOS,
  animated:        IOS,
  action:          'onDidFocus'
}

StatusBarEvents.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  barStyle:        PropTypes.string.isRequired,
  translucent:     PropTypes.bool.isRequired,
  animated:        PropTypes.bool.isRequired,
  action:          PropTypes.string.isRequired,
}

export default StatusBarEvents
