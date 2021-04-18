import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = (props) => {
    return(
        <LinearGradient
            colors={['rgba(15,136,147,1)', 'rgba(161,248,255,1)',]}
            style={styles.buttonEntrar}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 1]}
        >
            {props.children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    buttonEntrar: {
        padding: 10,
        borderRadius: 10,
        width: 150,
        height: 55,
        marginTop: 20,
        color: 'black',
        alignItems: 'center',
    },
})

export default GradientButton;