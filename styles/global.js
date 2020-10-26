import React from 'react';
import { StyleSheet, View } from 'react-native';

const globalStyles = StyleSheet.create({
    contendedor: {
        flex: 1,

    },
    contenido: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff'
    },
    subtitulo: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize:26,
        fontWeight: 'bold',
        color: '#fff',
        marginTop:20
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 20
    },
    boton:{
        backgroundColor:'#28303b',
    },
    botonTexto:{
        textTransform:'uppercase',
        color:"#fff",
        fontWeight:'bold'
    },
    enlace:{
        color:'#fff',
        marginTop:60,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        textTransform:'uppercase'
    }

});
export default globalStyles