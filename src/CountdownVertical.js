import React, { useState, useEffect } from 'react'
import { Box } from 'gestalt'
import HeaderText from './HeaderText'

const Countdown = (props) => {
  const { datetime, size, color = 'white' } = props
  const [countdownDate, setCountdownDate] = useState(datetime)

  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => setNewTime(), 1000)
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    setCountdownDate(props.datetime)
  }, [props.datetime])

  const onTimeIsUp = () => {
    if(props.onTimeIsUp) props.onTimeIsUp()
  }

  const _format = (time) => {
    if(time > 0) {
      return time
    }

    return '00'
  }

  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      if(distanceToDate <= 0) {
        onTimeIsUp()
      }

      setState({ days: days, hours: hours, minutes, seconds });
    }
  };

  // let hoursFormat = parseInt(state.hours)

  // if(state.days && state.days > 0) {
  //   hoursFormat += (parseInt(state.days) * 24)
  // }

  return (
      <Box display='flex' direction='row' alignItems='end' justifyContent='center'>
        <Box column={3} display='flex' direction='column'>
          <HeaderText color={color} size={size}>
            {_format(state.days)} 
          </HeaderText>
          <HeaderText color={color} size='md'>өдөр</HeaderText>
        </Box>
        <Box column={3} display='flex' direction='column'>
          <HeaderText color={color} size={size}>
            {`${_format(state.hours)}`}
          </HeaderText>
          <HeaderText color={color} size='md'>цаг</HeaderText>
        </Box>
        <Box column={3} display='flex' direction='column'>
          <HeaderText color={color} size={size}>
            {`${_format(state.minutes)}`}
          </HeaderText>
          <HeaderText color={color} size='md'>мин</HeaderText>
        </Box>
        <Box column={3} display='flex' direction='column'>
          <HeaderText color={color} size={size}>
            {_format(state.seconds)}
          </HeaderText>
          <HeaderText color={color} size='md'>сек</HeaderText>
        </Box>
      </Box>
  )
};

export default Countdown