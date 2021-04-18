import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientHeader = (props) => {
    return(
        <LinearGradient
            colors={['rgba(15,136,147,1)', 'rgba(161,248,255,1)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0,1 ]}
        >
                {props.children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        },
});

export default GradientHeader;