import React,{useState} from 'react';
import {StyleSheet,View} from 'react-native';
import {Text,Container,Content,Button,H2,Form,Item,Toast,List,Input} from 'native-base'
import globalStyles from '../styles/global'
import {useNavigation} from '@react-navigation/native'
import {gql,useMutation,useQuery} from '@apollo/client'
import Tarea from '../components/tarea'
const NUEVA_TAREA = gql`
  mutation nuevaTarea($input:TareaInput){
    nuevaTarea(input:$input){
      nombre
      id
      proyecto
      estado
    }
  }
`
const OBTENER_TAREAS = gql`
  query obtenerTareas($input:ProyectoIDInput){
    obtenerTareas(input:$input){
      nombre
      id
      proyecto
      estado
    }
  }
`
const Proyecto = ({route}) => {
  const navigation = useNavigation()
  const {id} = route.params
  const [mensaje,guardarMensaje] = useState(null)
  const [nombre,guardarNombre] = useState('')

  //CREAR TAREAS
  const [nuevaTarea] = useMutation(NUEVA_TAREA,{
    update(cache,{data:{nuevaTarea}}){
      const {obtenerTareas} = cache.readQuery({
        query:OBTENER_TAREAS,
        variables:{
          input:{
            proyecto:id
          }
        }
      });
      cache.writeQuery({
        query:OBTENER_TAREAS,
        variables:{
          input:{
            proyecto:id
          }
        },
        data:{
          obtenerTareas:[...obtenerTareas,nuevaTarea]
        }
      })
    }
  })

  //OBTENER TAREAS
  const { data,loading,error } = useQuery(OBTENER_TAREAS,{
    variables:{
      input:{
        proyecto:id
      }
    }
  })
  console.log(data)
  const handleSubmit = async() => {
    //valida
    if(nombre === ''){
      guardarMensaje('El nombre es obligatorio.')
      return;
    }
    //guardar
    try {
        const {data} = await nuevaTarea({
            variables:{
                input:{
                    nombre,
                    proyecto:id
                }
            }
        })
       guardarNombre('')
       guardarMensaje('Tarea creada correctamente')
    } catch (error) {
      console.log(error)
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
  //si apollo consulta true
  if(loading) return <Text>Cargando....</Text>
  return(
      <Container style={[globalStyles.contendedor,{backgroundColor:'#E84347'}]}>
        <Form style={{marginHorizontal:'2.5%',marginTop:20}}>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
                placeholder="Nombre tarea"
                value={nombre}
                onChangeText={texto=>guardarNombre(texto)}
            />
          </Item>
          <Button
        style={[globalStyles.boton]}
        square
        block
        onPress={()=>handleSubmit()}
      >
        <Text style={globalStyles.botonTexto}>Guardar</Text>
      </Button>
        </Form>
        <H2 style={globalStyles.subtitulo}>Tareas: {route.params.nombre}</H2>
        <Content>
          <List style={styles.contenido}>
              {data.obtenerTareas.map(tarea=>(
                <Tarea
                  key={tarea.id}
                  tarea={tarea}
                  proyectoId={id}
                />
              ))}
          </List>
        </Content>
      {mensaje && mostrarAlerta()}

      </Container>
  )
}

const styles = StyleSheet.create({
    contenido:{
      backgroundColor:'#fff',
      marginHorizontal:'2.5%'
    }
});
export default Proyecto
