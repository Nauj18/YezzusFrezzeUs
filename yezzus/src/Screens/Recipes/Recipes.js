import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, Image, View, ActivityIndicator, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Icon, Button, Header, Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

const API_KEY = '6aa6eba8b0845d9c2db7f1f140732050';

export default class Recipes extends Component{
  state = {
    data: [],
    recipes: [],
    recipeDetails : [],
    selectedRecipe: [],
    selectedItems: [],
    filterType: '',
    recipeModalVisible: false
  };

  componentWillMount(){
    let params = {query: 'chicken%20breast,tortilla', sort: 'r'}
    this.fetchData(params);
  }

  fetchData = async(params) => { 
    // Random Name API
    // const response = await fetch('https://randomuser.me/api?results=21');
    // const json = await response.json();
    // let data = [];
    // json.results.forEach(element => {
    //   data.push({name: `${element.name.first} ${element.name.last}`})
    // });
    // console.log(data)
    // this.setState({ data });

    // Recipe API
    const recipeResults = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${params.query}&sort=${params.sort}`)
    const json = await recipeResults.json();
    let recipes = [];
    json.recipes.forEach(element => {
      recipes.push(element)
    })
    this.setState({ recipes });
  }

  fetchRecipeDetails = async(item) => {
    const detailResults = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY}&rId=${item.recipe_id}`)
    const recipeDetails = await detailResults.json();

    this.setState({ recipeDetails: recipeDetails.recipe });
  
  }

  setRecipeModalVisible(recipeModalVisible) {
    this.setState({ recipeModalVisible });
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  renderRow(item, index){
    return(
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
        <Text>{item}
        </Text>
      </View>
    )
  }

  getTitle(){
    console.log(this.state.recipeDetails)
    return(this.state.recipeDetails.title)
  }

  renderCard(item, index){
    return(
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => { this.fetchRecipeDetails(item); this.setRecipeModalVisible(true);  }} >
          <Card
            title={item.title}
            titleStyle={{fontSize: 12}}
            containerStyle={{height: 150}}>
            <View style={{
              flexDirection: 'row',
            }}>
            <Image
              style={styles.image}
              source={{uri: item.image_url}}
              PlaceholderContent={<ActivityIndicator />}/>
            </View>
          </Card>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent
          visible={this.state.recipeModalVisible}
          onRequestClose={() => {
              Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.containerStyle}>
            <View style={{alignItems: 'left', paddingLeft: 15}}>
              <Icon
                onPress={() => { this.setRecipeModalVisible(false); }}
                size={24}
                name='x'
                type='octicon'
              />
            </View>
            {/* <View style={{maxHeight: Dimensions.get('window').height * 0.9, flex: 1}}> */}
              <Card
                title={this.getTitle()}
                style={{ justifyContent: 'center' }}
                containerStyle={{maxHeight: Dimensions.get('window').height * 0.9, flex: 1}}
                image={{uri: this.state.recipeDetails.image_url}}
                >
                <Text style={{fontWeight: 'bold', fontSize: 16}} containerStyle={{height: 25, marginBottom: 20}}>Ingredients:</Text>
                <FlatList
                  data={this.state.recipeDetails.ingredients}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                  extraData={this.state}
                  renderItem={({item, index}) => this.renderRow(item, index)}/>
              </Card>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => goBack() }}
          centerComponent={{ text: 'RECIPES',
            style: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Helvetica'
            }
          }}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around',
            backgroundColor: '#457ABE'
          }}
        />
        <View style={styles.list}>
          <FlatList
            data={this.state.recipes}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
            numColumns={2}
            renderItem={({ item, index }) => this.renderCard(item, index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 40,
    // marginBottom: 40
  },
  listItem: {
    maxWidth: Dimensions.get('window').width /2,
    // height: Dimensions.get('window').height /3,
    flex:0.5,
    // backgroundColor: '#fff',
    // marginBottom: 20,
    borderRadius: 4,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    width: 50,
    height: 50,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
  },
  separator: {
    height: 0.5,
    width: "90%",
    alignSelf: 'center',
    backgroundColor: "#555"
  },
})
