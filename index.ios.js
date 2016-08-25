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
  TouchableHighlight,
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

    render(){
       if (!this.state.loaded) {
          return this.renderLoadingView()
       }else{
          return this.renderListView()
       }
    },

    renderLoadingView(){
      return(
        <Image source={require('./img/background.png')} style={styles.backgroundLoading}>
          <ActivityIndicatorIOS 
            style={{alignItems:'center',justifyContent:'center',height:50}}
            size= "large"
            color= "red"
          />
        </Image>
      );
    },
   

    renderListView(){
      return(
        <Image source={require('./img/background.png')} style={styles.backgroundImg}>
          <ListView
            dataSource={this.state.users}
            renderRow={this.renderRow}
            style={styles.fullList}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
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

      this.props.navigator.push({
        title:"我是第二个页面",
        component:SecondPage,
        passProps:{user:user},
      })
    },
    
});

//添加一个二级页面
var SecondPage = React.createClass({
  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.blackText}>{this.props.user.nickname}</Text>
        <Text style={styles.blackText}>{this.props.user.realname}</Text>
      </View>
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
