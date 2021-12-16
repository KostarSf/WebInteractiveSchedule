import React from "react";
import { Text, StyleSheet, View } from 'react-native';

export type Props = {}

const Options: React.FC<Props> = ({ }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{flex: 1}}>

            </View>
            <Text style={styles.copyrightText}>KostarSf © 2021</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    copyrightText: {
        textAlign: "center",
        height: 50,
        lineHeight: 50,
        color: '#CCC',
        fontFamily: 'Roboto-Light',
        fontSize: 14
    }
});

export default Options;
