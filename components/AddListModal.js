import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity,TextInput } from 'react-native';
import  {AntDesign} from '@expo/vector-icons';
import colors from '../colour';
import tempData from '../tempData'
export default class AddListModal extends Component {
backgroundColor = [
    "#5CD859", "#24A6D9", "#595BD9", "#8022D9", "#D159D8", "#D85963" , "#D88559"
]

state = {
    Title : "",
    color: this.backgroundColor[0]
}

createTodo = () => {
    const { Title, color } = this.state;

    // tempData.unshift({
    //     Title,
    //     color,
    //     todos: []
    // });

    const list = { Title, color };
    this.props.addList(list);

    this.setState({
        Title: ""
    })

    this.props.closeModel();
}
  
handleText = (text) => {
    this.setState({
        Title: text
    })
}

renderColors = () => {
    return this.backgroundColor.map(color => {
        return(
            <TouchableOpacity key={color} style={[styles.colorSelect, {backgroundColor: color}]} onPress={() => this.setState({ color })}/>
        )
    })
}

  render() {
    return (
     <KeyboardAvoidingView style={styles.container} behavior="padding">
         <TouchableOpacity style={{position:"absolute",top:64,right:32}} onPress={this.props.closeModel}>
            <AntDesign name="close" size={24} color={colors.green} />
         </TouchableOpacity>

         <View style={{alignSelf:"stretch", marginHorizontal: 32}}>
             <Text style={styles.title}>Create Todo List</Text>
                <TextInput style={styles.input} placeholder="List Name" onChangeText={(text) => {this.handleText(text)}}/>


                <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 12} }>
                    {this.renderColors()}
                </View>


                <TouchableOpacity style={[styles.create, {backgroundColor: this.state.color}]} onPress={this.createTodo}>
                    <Text style={{color: colors.white, fontWeight: "600"}}> Create! </Text>
                </TouchableOpacity>
         </View>
     </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.green,
        alignSelf: "center",
        marginBottom: 16
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,

    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",

    },
    colorSelect: {
        width: 38,
        height: 30,
        borderRadius: 4
    }
    
})
