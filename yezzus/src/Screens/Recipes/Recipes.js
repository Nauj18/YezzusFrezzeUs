import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Picker, Modal, Linking, Dimensions, ActivityIndicator, } from 'react-native';
import { Icon, Button, Header, Card, Avatar } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Items from '../Inventory/Items.json';

// const API_KEY = '6aa6eba8b0845d9c2db7f1f140732050';
const API_KEY = '84e7f1ece3be429157e54ec9cda3ec54'

export default class Recipes extends Component{

  state = {
    data: [],
    recipes: [],
    recipeDetails : [],
    selectedRecipe: [],
    selectedItems: [],
    selectedSort: 'r',
    filterType: '',
    inventoryData:[],
    recipeModalVisible: false,
    ingredientsModalVisible: true,
    page: 1,
    loading: false
  };

  componentWillMount(){
    let params = {query: 'chicken%20breast,spinach', sort: 'r'}
    this.fetchInventoryData(params);
  }

  fetchData = async() => { 
    // Recipe API
    this.setState({ loading: true })
    let query = this.getItems();
    let page = this.state.page;
    page++;
    this.setState({ page });
    const recipeResults = await fetch(`https://www.food2fork.com/api/search?key=${API_KEY}&q=${query}&sort=${this.state.selectedSort}&page=${page}`)
    const json = await recipeResults.json();
    let recipes = this.state.recipes;
    json.recipes.forEach(element => {
      recipes.push(element)
    })
    this.setState({ recipes });
    this.setState({ loading: false })
  }

  fetchRecipeDetails = async(item) => {
    const detailResults = await fetch(`https://www.food2fork.com/api/get?key=${API_KEY}&rId=${item.recipe_id}`)
    const recipeDetails = await detailResults.json();

    this.setState({ recipeDetails: recipeDetails.recipe });
  }

  fetchInventoryData = async(item) => {
    const data = [];
    let id = 3;
    let children = [];

    Items.Location.Fridge.forEach(element => {
      children.push({ name: element.Name, id: id });
      id++;
    });
    data.push({ name: 'Fridge', id: 0, children: children });
    children = [];
    Items.Location.Freezer.forEach(element => {
      children.push({ name: element.Name, id: id });
      id++;
    });
    data.push({ name: 'Freezer', id: 1, children: children });
    children = [];
    Items.Location.Pantry.forEach(element => {
      children.push({ name: element.Name, id: id });
      id++;
    });
    data.push({ name: 'Pantry', id: 2, children: children });
    this.setState({ inventoryData: data });
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

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  getTitle(){
    return(this.state.recipeDetails.title)
  }

  getItems(){
    let itemNames = '';
    let elements = [];
    this.state.inventoryData.forEach(element => {
      element.children.forEach(child => {
        elements.push(child);
      });
    });
    this.state.selectedItems.forEach(item => {
      elements.forEach(element => {
        if (element.id === item)
          itemNames = itemNames + element.name + ",";
      });
    });
    return itemNames;
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
              image={{uri: this.state.recipeDetails.image_url}}
              >
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}} containerStyle={{height: 25, marginBottom: 20}}>Ingredients:</Text>
                <FlatList
                  data={this.state.recipeDetails.ingredients}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={this.renderSeparator}
                  extraData={this.state}
                  renderItem={({item, index}) => this.renderRow(item, index)}/>
              </View>
              <Icon
                onPress={() => Linking.openURL(`${this.state.recipeDetails.source_url}`) }
                containerStyle={{
                  alignItems:'flex-end',
                  paddingLeft: 6,
                  paddingTop: 5
                }}
                size={15}
                reverse
                raised
                name='link-external'
                type='octicon'
                color="white"
                iconStyle={{color: "black", fontSize:14}}
              />
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
          rightComponent={{ icon: 'search', color: '#fff', onPress:() => { this.setIngredientsModalVisible(true);}}}
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
            }}>
            <View style={styles.containerStyle}>
              <Card
              title="SELECT ITEMS"
              style={{ justifyContent: 'center' }}>
              <View>
                <SectionedMultiSelect
                  items={this.state.inventoryData}
                  uniqueKey='id'
                  subKey='children'
                  iconKey='icon'
                  selectText='Choose Ingredients...'
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                />
                </View>
              <Button
                onPress={() => {
                  this.setIngredientsModalVisible(false);
                  this.fetchData();
                }}
                title='SEARCH'
                titleStyle={{ fontSize: 20 }}
                buttonStyle={styles.buttonStyle}
              />
              <Text
                style={{
                    textAlign: 'center',
                    fontSize: 20,
                    textDecorationLine: 'underline',
                    paddingTop: 10
                }}
                onPress={() => this.setIngredientsModalVisible(false)}>
                Cancel
              </Text>
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
            onEndReached={() => this.fetchData()}
            onEndReachedThreshold={0.01}
            ListFooterComponent={() => {
              return this.state.loading ? <View style={{flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10}}>
                <ActivityIndicator size="large" color="#457abe" />
              </View> : null
          }}
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
    justifyContent: 'center',
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
  },
  linkButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom:10,
  },
});
