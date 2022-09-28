import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Box, Sticky, ScrollBoundaryContainer } from 'gestalt'

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const Wrapper = (props) => {
    const { top = 120 } = props
    const size = useWindowSize()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    if(isTabletOrMobile) {
        return <Box>{props.children}</Box>
    }

    return (
        <Sticky top={top} height={size.height / 1.2}>
            <ScrollBoundaryContainer>
                {props.children}
            </ScrollBoundaryContainer>
        </Sticky>
    )
}

export default Wrapper