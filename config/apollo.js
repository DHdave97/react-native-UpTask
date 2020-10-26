import {ApolloClient} from '@apollo/client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {setContext} from 'apollo-link-context'
const httpLink = createHttpLink({
    uri:'https://shielded-mesa-44671.herokuapp.com/'
})
const authLink = setContext(async(_,headers)=>{
    //leer token storage
    const token = await AsyncStorage.getItem('token')
    console.log("recibo token",token)
    return {
        headers:{
            ...headers,
            authorization:token ? `Bearer ${token}`:''
        }
    }
})
const client = new ApolloClient({
    cache:new InMemoryCache(),
    link:authLink.concat(httpLink)
})

export default client