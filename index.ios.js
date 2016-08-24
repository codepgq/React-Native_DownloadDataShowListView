/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  NavigatorIOS,
  Image,
  ActivityIndicatorIOS,
} from 'react-native';

var URL = 'https://raw.githubusercontent.com/LeoMobileDeveloper/React-Native-Files/master/person.json';

var RootView = React.createClass({

    getInitialState:function(){
      return{
        loaded:false,
        users:new ListView.DataSource({
          rowHasChanged:(row1,row2) => row1 !== row2,
        }),
      };
    },

    componentDidMount(){
      //加载完成后调用 请求数据
      this.dwonloadData();
    },
    dwonloadData(){
      fetch(URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            users:this.state.users.cloneWithRows(responseData),
            loaded:true,
          });
        })
        .done();
    },
    loadingView(){
      return(
        <Image source={require('./img/background.png')} style={styles.backgroundImg}>
          <Text style={styles.whiteText}>纸巾艺术</Text>
          <ActivityIndicatorIOS 
            style={{alignItems:'center',justifyContent:'center',height:50}}
            size= "large"
            color= "gray"
          />
        </Image>
      );
    },
    showListView(){
      return(
        <Image source={require('./img/background.png')} style={styles.backgroundImg}>
          <Text style={styles.whiteText}>纸巾艺术</Text>
          <ListView
            DataSource={this.state.users}
            renderRow={this.fullList}
            renderSeparator={(sectionID,rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}
          />
        </Image>
      );
    },

    renderRow(user){
      return (
       <TouchableHighlight
          onPress={() => this.rowClicked(user)}
         underlayColor = '#ddd'>
       <View style={styles.rightCongtainer}>
          <Text style={styles.whiteText}>{user.nickname}</Text>
         <Text style={styles.whiteText}>{user.realname}</Text>
        </View>
       </TouchableHighlight>
     );
    },
    rowClicked(user){
      console.log(user);
    },

    render(){
      return (
       if (!this.state.loaded) {
          return this.loadingView()
       }else{
          return this.showListView()
       }
      );
    }
});



var DownloadDataShowListView = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: '主页',
          component: RootView,
        }}
      />
    );
  }
});

const styles = StyleSheet.create({
  backgroundImg:{
    flex:1,
    width: null,
    height: null,
    flexDirection: 'row'
  },
  backgroundLoading:{
    flex:1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  thumbnail: {
    width: 60,
    height: 60,
  },
  rightCongtainer:{
    flex:1,
  },
  fullList:{
    flex:1,
    paddingTop: 64,
  },
  separator: {
   height: 0.5,
   backgroundColor: 'rgba(255,255,255,0.5)',
 },
 centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText:{
    fontSize:20,
    color:'rgb(255,255,255)',
    backgroundColor:'rgba(255,255,255,0)',
    textAlign:'left',
    marginLeft:10,
  },
  blackText:{
    fontSize:20,
    color:'rgb(0,0,0)',
    backgroundColor:'rgba(255,255,255,0)',
    textAlign:'center',
    marginLeft:10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('DownloadDataShowListView', () => DownloadDataShowListView);
