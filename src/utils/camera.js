import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RNCamera } from 'react-native-camera';
import { CommonActions } from '@react-navigation/native';


export default function Camera({ route, navigation }) {
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, doNotSave: true };
            const { base64 } = await this.camera.takePictureAsync(options)
            navigation.dispatch(
                CommonActions.navigate({
                    name: route.params.route,
                    params: {
                        base64: base64,
                    },
                })
            );
        }
    }
    return (
        <>
            <RNCamera
                ref={camera => { this.camera = camera }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                autoFocus={RNCamera.Constants.AutoFocus.on}
                flashMode={RNCamera.Constants.FlashMode.off}
                androidCameraPermissionOptions={{
                    title: 'Permissão para usar a câmera',
                    message: 'Precisamos de peermissão prara usar a câmera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={takePicture} style={styles.capture}>
                    <Text style={styles.buttonText}> Capturar </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center"
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20
    },
    buttonText: {
        fontSize: 14
    }
});
