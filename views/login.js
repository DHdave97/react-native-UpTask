import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {Text,Content,Button,Container,H1,Input,Form,Item,Toast} from 'native-base'
import globalStyles from '../styles/global'
import AsyncStorage from '@react-native-community/async-storage'
//apollo
import {gql,useMutation} from '@apollo/client'
const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input:AutenticarInput){
        autenticarUsuario(input:$input){
        token
        }
    }
`

const Login=()=>{
    const navigation = useNavigation()

    const [email,guardarEmail] = useState('')
    const [password,guardarPassword] = useState('')
    const [mensaje,guardarMensaje] = useState(null)

//mutation apollo
const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO)

    const handleSubmit = async() => {
        //valida
        if(email === '' || password === ''){
          guardarMensaje('Todos los campos son obligatorios.')
          return
        }
        //guardar
        try {
            const {data} = await autenticarUsuario({
                variables:{
                    input:{
                        email,
                        password
                    }
                }
            })
            const {token} = data.autenticarUsuario
            //storage token
            await AsyncStorage.setItem('token',token)
            //redirecion a proyectos
            navigation.navigate('Proyectos')
        } catch (error) {
          guardarMensaje(error.message.replace('GraphQL error:',''))   
        }
      }
      //toast
      const mostrarAlerta = () => {
        Toast.show({
            text:mensaje,
            buttonText:'OK',
            duration:2000
        })
      }
    
    return(
        <Container style={[globalStyles.contendedor,{backgroundColor:'#E84347'}]}>
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>UPtask</H1>
                <Form>
                <Item inlineLabel last style={globalStyles.input}>
                        <Input   
                        onChangeText={texto=>guardarEmail(texto.toLocaleLowerCase())}
                        value={email}
                        placeholder="Email"/>
                    </Item>
                    <Item inlineLabel last style={globalStyles.input} >
                        <Input 
                        onChangeText={texto=>guardarPassword(texto)}
                            secureTextEntry={true}
                        placeholder="Password"/>
                    </Item>
                </Form>
                <Button
                style={globalStyles.boton}
                square
                block
                onPress={()=>handleSubmit()}
                >
                    <Text style={globalStyles.botonTexto}>Iniciar Sesión</Text>
                </Button>
                
                <Text  style={globalStyles.enlace} onPress={()=>navigation.navigate("SignUp")}>Crear cuenta</Text>
                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    
});
export default Login