import { StatusBar } from 'expo-status-bar';
import React from 'react';
import colours from './colour';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import tempData from './tempData'
import TodoList  from './components/TodoList'
import AddListModal from './components/AddListModal'
import axios from 'axios';
export default class App extends React.Component {
  state = {
    addTodoVisible : false,
    lists: []
  };
  
  componentDidMount(){
    let response;
    axios.get('https://whattodohunter.herokuapp.com/api/List')
            .then(res => {
              response = res.data;
              this.setState({
                lists: response
              })
        }).catch(err => {
            console.log(err);
        })
}

componentDidUpdate(){
  let response;
  axios.get('https://whattodohunter.herokuapp.com/api/List')
          .then(res => {
            response = res.data;
            this.setState({
              lists: response
            })
      }).catch(err => {
          console.log(err);
      })
}

  toggleAddTodoVisible = () => {
    this.setState({
      addTodoVisible: !this.state.addTodoVisible
    })
  };

  renderList = list => {
     return <TodoList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    const finalList = {...list,id: this.state.lists.length + 1, todos: []}
    axios
      .post("https://whattodohunter.herokuapp.com/api/Create",finalList)
      .then(res => console.log(res) )
      .catch(err => console.error(err));
  };

  updateList = list => {
    
    const apiListId = "https://whattodohunter.herokuapp.com/api/Edit/"+list._id;
      axios
        .post(apiListId,list)
        .then(res => {
          console.log(res)} )
        .catch(err => console.error(err));
      console.log("https://whattodohunter.herokuapp.com/api/Edit/"+list._id);
      console.log("listtodo",list.todos);
  }

render(){
  return (
    

    <View style={styles.container}>

    <Modal  animationType="slide" visible={this.state.addTodoVisible}
    onRequestClose={() => this.toggleAddTodoVisible()}
    >
      <AddListModal closeModel={() => this.toggleAddTodoVisible()} addList={this.addList}/>
    </Modal>

    <View>
      
        {this.state.lists.length === 0 ? (
           (
            <Text>
              Loding Data!
            </Text>
          )
        ) : (
          <Text>
            </Text>
        )}
      
    </View>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          What<Text style={{fontWeight:"300", color: colours.blue}}>
             ToDO
          </Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{marginVertical: 48}}>
          <TouchableOpacity style={styles.addlist} onPress={this.toggleAddTodoVisible}>
            <AntDesign name='plus' size={16}  color = {colours.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{height: 275, paddingLeft: 32}}>
        <FlatList data={this.state.lists} keyExtractor={item => item.Title}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => this.renderList(item)}
          keyboardShouldPersistTaps='always'
            />

      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colours.lightblue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
   title : {
     fontSize: 30,
     fontWeight: "800",
      color: colours.green,
      paddingHorizontal: 30 
   },
   addlist: {
      borderWidth: 2,
      borderColor: colours.lightblue,
       borderRadius: 4,
       padding: 16,
       alignItems: 'center',
        justifyContent: 'center'
    },
    add : {
      color: colours.blue,
      fontWeight: '600',
      fontSize: 14,
      marginTop: 8
    }

});
