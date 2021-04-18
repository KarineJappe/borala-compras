import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = (props) => {
    return(
        <LinearGradient
            colors={['rgba(4, 76, 88, 1)', 'rgba(4, 76, 88, 1)',
                'rgba(15, 136, 147, 1)', 'rgba(161, 248, 255, 1)',
                'rgba(231, 255, 255, 1)', 'rgba(238, 224, 223, 1)',
                'rgba(233, 207, 182, 1)']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            locations={[0, 0, 0.1, 0.3075, 0.5729, 0.869, 1]}
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

export default Gradient;