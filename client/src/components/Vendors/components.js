import React, { Fragment } from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { fade } from '@material-ui/core/styles/colorManipulator'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

// *******************************************************
// RAIL COMPONENT
// *******************************************************
const railStyle = () => ({
  common: {
    position: 'absolute',
    width: '100%',
    transform: 'translate(0%, -50%)',
  },
  outer: {
    height: 10,
    borderRadius: 5,
    cursor: 'pointer',
  },
  inner: {
    height: 4,
    borderRadius: 5,
    pointerEvents: 'none',
    backgroundColor: '#f0f3f5',
  },
})

function RailComponent({ classes, getRailProps }) {
  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        {...getRailProps()}
      />
      <div className={clsx(classes.common, classes.inner)} />
    </Fragment>
  )
}

RailComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  getRailProps: PropTypes.func.isRequired,
}

export const SliderRail = withStyles(railStyle)(RailComponent)

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const handleStyle = theme => {
  const colors = {
    primary: "#E04D05",
    thumbOutline: fade("#E04D05", 0.16),
  }

  return {
    common: {
      position: 'absolute',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    outer: {
      zIndex: 5,
      width: 20,
      height: 40,
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      backgroundColor: 'none',
    },
    inner: {
      zIndex: 2,
      width: 12,
      height: 12,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: colors.primary,
    },
    active: {
      boxShadow: `0px 0px 0px 13px ${colors.thumbOutline}`,
    },
  }
}

function HandleComponent({
  activeHandleID,
  domain: [min, max],
  handle: { id, value, percent },
  classes,
  getHandleProps,
}) {
  const active = activeHandleID === id

  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        style={{ left: `${percent}%` }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={clsx(
          classes.common,
          classes.inner,
          active && classes.active,
        )}
        style={{ left: `${percent}%` }}
      >
        <div style={{ fontFamily: 'Rubik', fontSize: 11, marginTop: -25, textAlign: "center"}}>
          {Math.round(value*10)/10}
        </div>
      </div>
    </Fragment>
  )
}

HandleComponent.propTypes = {
  activeHandleID: PropTypes.string,
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getHandleProps: PropTypes.func.isRequired,
}

export const Handle = withStyles(handleStyle)(HandleComponent)

// *******************************************************
// TRACK COMPONENT
// *******************************************************
const trackStyle = theme => ({
  root: {
    position: 'absolute',
    transform: 'translate(0%, -50%)',
    height: 4,
    zIndex: 1,
    borderRadius: 5,
    cursor: 'pointer',
    backgroundColor: "#E04D05",
  },
})

function TrackComponent({ classes, source, target, getTrackProps }) {
  return (
    <div
      className={classes.root}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

TrackComponent.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getTrackProps: PropTypes.func.isRequired,
}

export const Track = withStyles(trackStyle)(TrackComponent)

// *******************************************************
// TICK COMPONENT
// *******************************************************
const tickStyle = theme => ({
  tick: {
    position: 'absolute',
    marginTop: 10,
    width: 1,
    height: 5,
    backgroundColor: theme.palette.text.primary,
  },
  label: {
    position: 'absolute',
    marginTop: 16,
    textAlign: 'center',
  },
})

export function TickComponent({ classes, tick, count, format }) {
  return (
    <div>
      <div className={classes.tick} style={{ left: `${tick.percent}%` }} />
      <Typography
        className={classes.label}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
          fontFamily: 'Rubik'
        }}
      >
        {format(tick.value)} mi
      </Typography>
    </div>
  )
}

TickComponent.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

TickComponent.defaultProps = {
  format: d => d,
}

export const Tick = withStyles(tickStyle)(TickComponent)