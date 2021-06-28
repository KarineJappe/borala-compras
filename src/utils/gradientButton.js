import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = (props) => {
    return(
        <LinearGradient
            colors={['rgba(15,136,147,1)', 'rgba(161,248,255,1)',]}
            style={props.buttonStyle}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
        >
            {props.children}
        </LinearGradient>
    );
}

export default GradientButton;