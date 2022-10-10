import React, { useState, useEffect } from 'react'
import { Box, Text } from 'gestalt'
import BoldText from './BoldText'

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
    let interval = setInterval(() => setNewTime(), 1000);
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
        <BoldText color={color} align='center' size={size}>
          {_format(state.days)} 
        </BoldText>
        <div style={{ marginLeft: 3, marginRight: 3 }}>
          <Text color={color}>өдөр</Text>
        </div>
        <div style={{ marginStart: 3, marginEnd: 3 }}>
          <BoldText color={color} align='center' size={size}>
            {`${_format(state.hours)}`}
          </BoldText>
        </div>
        <div style={{ marginLeft: 3, marginRight: 3 }}>
          <Text color={color}>цаг</Text>
        </div>
        <div style={{ marginStart: 3, marginEnd: 3 }}>
          <BoldText color={color} align='center' size={size}>
            {`${_format(state.minutes)}`}
          </BoldText>
        </div>
        <div style={{ marginLeft: 3, marginRight: 3 }}>
          <Text color={color}>мин</Text>
        </div>
        <div style={{ marginStart: 3, marginEnd: 3 }}>
          <BoldText color={color} align='center' size={size}>
            {_format(state.seconds)}
          </BoldText>
        </div>
        <div style={{ marginLeft: 3 }}>
          <Text color={color}>сек</Text>
        </div>
      </Box>
  )
};

export default Countdown