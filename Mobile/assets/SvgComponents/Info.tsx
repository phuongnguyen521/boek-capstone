import React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Info(props: SvgProps) {
    return (
        <Svg height={24} width={24} {...props}>
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </Svg>
    )
}

export default Info