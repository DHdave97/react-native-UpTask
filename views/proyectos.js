import React from 'react';
import {StyleSheet,View} from 'react-native';
import {Text,Container,Content,Button,H2,List,ListItem,Left,Right} from 'native-base'
import globalStyles from '../styles/global'
import {useNavigation} from '@react-navigation/native'

//apollo
import {gql,useQuery} from '@apollo/client'

const OBTENER_PROYECTOS = gql`
  query obtenerProyectos{
    obtenerProyectos{
      id
      nombre
    }
  }
`

const Proyectos = () => {
  const navigation = useNavigation()

  const { data,loading,error } = useQuery(OBTENER_PROYECTOS)
  if(loading) return <Text>Cargando....</Text>
  return(
    <Container style={[globalStyles.contendedor,{backgroundColor:'#E84347'}]}>
      <Button
        style={[globalStyles.boton,{marginTop:30}]}
        square
        block
        onPress={()=>navigation.navigate('NuevoProyecto')}
      >
        <Text style={globalStyles.botonTexto}>Nuevo Proyecto</Text>
      </Button>
      <H2 style={globalStyles.subtitulo}>Selecciona un proyecto</H2>
      <Content >
        <List style={styles.contenido}>
            {data.obtenerProyectos.map(proyecto=>(

              <ListItem key={proyecto.id} onPress={()=>navigation.navigate('Proyecto',proyecto)}>
                <Left>
                  <Text>{proyecto.nombre}</Text>
                </Left>
                <Right>

                </Right>
              </ListItem>
            ))}
        </List>
      </Content>
    </Container>
  )
}
const styles = StyleSheet.create({
    contenido:{
      backgroundColor:'#fff',
      marginHorizontal:'2.5%'
    }
});
export default Proyectos