import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {Text,Container,Content,Button,H1,Form,Item,Input,Toast} from 'native-base'
import globalStyles from '../styles/global'
import {useNavigation} from '@react-navigation/native'

//apollo
import {gql,useMutation} from '@apollo/client'
const NUEVO_PROYECTO = gql`
    mutation nuevoProyecto($input:ProyectoInput){
      nuevoProyecto(input:$input){
        nombre,
        id
      }
    }
`
//actualziar cache
const OBTENER_PROYECTOS = gql`
query obtenerProyectos{
  obtenerProyectos{
    id
    nombre
  }
}
`

const NuevoProyecto = () => {
  const navigation = useNavigation()

    const [mensaje,guardarMensaje] = useState(null)
    const [nombre,guardarNombre] = useState('')
//mutation apollo
const [nuevoProyecto] = useMutation(NUEVO_PROYECTO,{
  update(cache,{data:{ nuevoProyecto }}){
    const {obtenerProyectos} = cache.readQuery({query:OBTENER_PROYECTOS}) 
    cache.writeQuery({
      query:OBTENER_PROYECTOS,
      data:{obtenerProyectos:obtenerProyectos.concat([nuevoProyecto])}
    })
  }
})
    const handleSubmit = async() => {
      //valida
      if(nombre === ''){
        guardarMensaje('El nombre es obligatorio.')
        return
      }
     
      //guardar
      try {
          const {data} = await nuevoProyecto({
              variables:{
                  input:{
                      nombre
                  }
              }
          })
         guardarMensaje('Proyecto creado correctamente')
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
          <H1 style={globalStyles.subtitulo}>Nuevo proyecto</H1>
          <Form>
            <Item inlineLabel last style={globalStyles.input}>
              <Input
                placeholder="Nombre del proyecto"
                onChangeText={(texto)=>guardarNombre(texto)}
              />
            </Item>
          </Form>
          <Button
        style={[globalStyles.boton,{marginTop:30}]}
        square
        block
        onPress={()=>handleSubmit()}
      >
        <Text style={globalStyles.botonTexto}>Guardar</Text>
      </Button>
      {mensaje && mostrarAlerta()}
      </View>
  </Container>
  )
}
const styles = StyleSheet.create({
    
});
export default NuevoProyecto