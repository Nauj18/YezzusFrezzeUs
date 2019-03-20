import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, Image, View, ActivityIndicator, FlatList, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Icon, Button, Header, Card, Avatar } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// const API_KEY = '6aa6eba8b0845d9c2db7f1f140732050';
const API_KEY = '84e7f1ece3be429157e54ec9cda3ec54'

export default class Recipes extends Component{

  state = {
    data: [],
    recipes: [],
    recipeDetails : [],
    selectedRecipe: [],
    selectedItems: [],
    filterType: '',
    recipeModalVisible: false,
    ingredientsModalVisible: true,
  };

  componentWillMount(){
    let params = {query: 'chicken%20breast,spinach', sort: 'r'}
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

  setIngredientsModalVisible(ingredientsModalVisible) {
    this.setState({ ingredientsModalVisible });
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
    return(this.state.recipeDetails.title)
  }

  renderCard(item, index){
    return(
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() => { this.fetchRecipeDetails(item); this.setRecipeModalVisible(true);  }} >
          <Card
            title={item.title}
            titleStyle={{fontSize: 12}}
            image={{uri: item.image_url}}>
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
            {/* <View style={{alignItems: 'left', paddingLeft: 10}}> */}
              <Icon
                onPress={() => { this.setRecipeModalVisible(false); }}
                size={10}
                reverse
                raised
                name='x'
                type='octicon'
                color="white"
                iconStyle={{color: "black", fontSize:14}}
              />
            {/* </View> */}
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
          rightComponent={{ icon: 'search', color: '#fff', onPress:() => { this.setIngredientsModalVisible(true); }}}
          containerStyle={{
            height: 85,
            justifyContent: 'space-around',
            backgroundColor: '#457ABE'
          }}
        />
        <Modal
            animationType="fade"
            transparent
            visible={this.state.ingredientsModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}
          >
            <View style={styles.containerStyle}>
              <Card
              title="SELECT ITEMS"
              style={{ justifyContent: 'center' }}
              >
              <Text>ITEMS WILL BE HERE</Text>
              <Button
                onPress={() => {
                  this.setIngredientsModalVisible(false);
                }}
                title='SEARCH'
                titleStyle={{ fontSize: 20 }}
                buttonStyle={styles.buttonStyle}
              />
              </Card>
            </View>
          </Modal>
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
  },
  listItem: {
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').width,
    flex:0.5,
    borderRadius: 4,
  },
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  modalText: {
    fontSize: 60,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center'
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
  buttonStyle: {
    width: 300,
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#457ABE'
  }
});
