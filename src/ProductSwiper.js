import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Box } from 'gestalt'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import Icon from './Icon'

const LeftWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 2;
  opacity: ${props => props.opacity};
`

const RightWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 2;
  opacity: ${props => props.opacity};
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  transform: rotate(90deg);
  border-radius: 24px;
  ${'' /* background: #fff; */}
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const RightIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  transform: rotate(270deg);
  border-radius: 24px;
  ${'' /* background: #fff; */}
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`

const SwiperComponent = (props) => {
    const { hasNavigation = false, showNavigation = false, total = 0 } = props
    const [index, setIndex] = useState(0)
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
      <Box 
        position='relative' 
      >
          <Swiper
            activeIndex={index}
            onSlideChange={(item) => {
                setIndex(item.activeIndex)
            }}
            {...props}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current
              swiper.params.navigation.nextEl = navigationNextRef.current
            }}
          >
            {props.children}
          </Swiper>

              <LeftWrapper ref={navigationPrevRef} opacity={(hasNavigation && index != 0) ? 1 : 0}>
                {
                  !isTabletOrMobile && (
                    <Box display='flex' alignItems='center' height='100%'>
                        <IconWrapper>
                          <Icon icon="Dropdown" size={12} />
                        </IconWrapper>
                      </Box>
                  )
                }
              </LeftWrapper>

              <RightWrapper ref={navigationNextRef} opacity={(hasNavigation && (total - 1) != index) ? 1 : 0}>
                {
                  !isTabletOrMobile && (
                    <Box display='flex' alignItems='center' height='100%'>
                      <RightIconWrapper>
                        <Icon icon='Dropdown' size={12} />
                      </RightIconWrapper>
                    </Box>
                  )
                }
              </RightWrapper>
      </Box>
    )
} 

export default SwiperComponent