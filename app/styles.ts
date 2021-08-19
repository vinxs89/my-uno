import { StyleSheet } from "react-native"

export const formStyles = StyleSheet.create({
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black'
    },
    select: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'black'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        marginTop: '40px'
    },
    buttonDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        marginTop: '40px',
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        color: 'white',
    },
});