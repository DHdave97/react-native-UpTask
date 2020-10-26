import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {Text,Content,Button,Container,H1,Input,Form,Item,Toast} from 'native-base'
import globalStyles from '../styles/global'


//apollo
import {gql,useMutation} from '@apollo/client'
const NUEVA_CUENTA = gql`
    mutation crearUsuario($input:UsuarioInput){
        crearUsuario(input:$input)
    }
`
const CrearCuenta=()=>{
    const navigation = useNavigation()

    const [nombre,guardarNombre] = useState('')
    const [email,guardarEmail] = useState('')
    const [password,guardarPassword] = useState('')
    const [mensaje,guardarMensaje] = useState(null)

    //mutation apollo
    const [crearUsuario] = useMutation(NUEVA_CUENTA)

    const handleSubmit = async() => {
      //valida
      if(nombre === '' || email === '' || password === ''){
        guardarMensaje('Todos los campos son obligatorios.')
        return
      }
      //pass 6 caracteres

      if(password.length < 6 ) {
           guardarMensaje('Password minimo de 6 caracteres')
           return
      }
      //guardar
      try {
          const {data} = await crearUsuario({
              variables:{
                  input:{
                      nombre,
                      email,
                      password
                  }
              }
          })
          guardarMensaje(data.crearUsuario)
          navigation.navigate('Login')
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
                        onChangeText={texto=>guardarNombre(texto)}
                        placeholder="Nombre"/>
                    </Item>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input   
                        onChangeText={texto=>guardarEmail(texto)}
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
                onPress={()=>handleSubmit()}
                style={globalStyles.boton}
                square
                block
                
                >
                    <Text style={globalStyles.botonTexto}>Crear</Text>
                </Button>
                {mensaje && mostrarAlerta()}
            </View>
        </Container>
    )
}
const styles = StyleSheet.create({
    
});
export default CrearCuenta