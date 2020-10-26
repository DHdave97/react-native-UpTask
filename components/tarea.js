import React from 'react';
import {StyleSheet,Alert} from 'react-native'
import {List,ListItem,Icon,Text,Left,Right,Toast} from 'native-base'
import {gql,useMutation,useQuery} from '@apollo/client'

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
const ACTUALIZAR_TAREA = gql`
  mutation actualizarTarea($id:ID!,$input:TareaInput,$estado:Boolean){
    actualizarTarea(id:$id,input:$input,estado:$estado){
      nombre
      id
      proyecto
      estado
    }
  }

`
const ELIMINAR_TAREA = gql`
  mutation eliminarTarea($id:ID!){
    eliminarTarea(id:$id)
  }

`
const Tarea = ({tarea,proyectoId}) => {

  console.log("recibo id del proyecto ",proyectoId)
  const [ actualizarTarea ] = useMutation(ACTUALIZAR_TAREA)
  const [ eliminarTarea ] = useMutation(ELIMINAR_TAREA,{
    update(cache){
      const {obtenerTareas} = cache.readQuery({
        query:OBTENER_TAREAS,
        variables:{
          input:{
            proyecto:proyectoId
          }
        }
      });
      cache.writeQuery({
        query:OBTENER_TAREAS,
        variables:{
          input:{
            proyecto:proyectoId
          }
        },
        data:{
          obtenerTareas:obtenerTareas.filter(tareaActual =>tareaActual.id !== tarea.id)
        }
      })
    }
  })

  //cambiar esatdo tarea
  const cambiarEstado = async() => {
    const {id} = tarea
    console.log(id)
    try {
      const {data} = await actualizarTarea({
        variables:{
          id,
          input:{
            nombre:tarea.nombre
          },
          estado:!tarea.estado
        }
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const mostrarEliminar = () => {
      Alert.alert(
        'Eliminar esta tarea',
        'Desea eliminar la tarea?',
        [
          {
            text:'Cancelar',
            type:'cancel',
          },
          {
            text:'Confirmar',
            onPress:()=>eliminarTareaDB()
          }
        ]
      )
  }
  const eliminarTareaDB = async() => {
    const {id} = tarea
    try {
        const {data} = await eliminarTarea({
          variables:{
            id
          }
        })
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  
  

  return(
      <>
        <ListItem
          onPress={()=>cambiarEstado()}
          onLongPress={()=>mostrarEliminar()}
        >
            <Left>
                <Text>{tarea.nombre}</Text>
            </Left>
            <Right>
              {tarea.estado ? (
                <Icon 
                style={[styles.icono, styles.completo]}
                name="ios-checkmark-circle"
              />
              ):(
                <Icon 
                style={[styles.icono, styles.incompleto]}
                name="ios-checkmark-circle"
              />
              )}
            </Right>
        </ListItem>
      </>
  )
}
const styles = StyleSheet.create({
  icono:{
    fontSize:32

  },
  completo:{
    color:'green'
  },
  incompleto:{
    color:'#E1E1E1'
  }
});
export default Tarea