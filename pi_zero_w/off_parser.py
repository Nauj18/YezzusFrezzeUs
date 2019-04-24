################################################################################
## OFF_Parser contains utility methods for parsing out the JSON object
## obtained from Open Food Facts into our FoodItem class
################################################################################
import json
from off_food_item import FoodItem

def parse_food_item(raw_food_data):
    if not 'product_name' in raw_food_data:
        print('ERROR: Product not found')
        return
    
    food_item = FoodItem(raw_food_data['product_name'])
    
    print('Scanned %s' % food_item.name)
    
    #################################################
    ## Add data from Open Food Facts to instantiation
    if 'allergens_from_ingredients' in raw_food_data:
        food_item.add_allergies(raw_food_data['allergens_from_ingredients'])
    
    if 'image_front_thumb_url' in raw_food_data:
        food_item.add_image(raw_food_data['image_front_thumb_url'])
        
    if 'ingredients_text' in raw_food_data:
        food_item.add_ingredients(raw_food_data['ingredients_text'])
    
    if 'categories' in raw_food_data:
        food_item.add_categories(raw_food_data['categories'])
    
    if 'nutriments' in raw_food_data:
        food_item.add_nutriments(raw_food_data['nutriments'])
    
    if 'nutrient_levels' in raw_food_data:
        levels = raw_food_data['nutrient_levels']
        
        # Verify all levels exist
        salt = 'X'
        sugars = 'X'
        saturated_fat = 'X'
        fat = 'X'
        
        if 'salt' in levels:
            salt = levels['salt']
        if 'sugars' in levels:
            sugars = levels['sugars']
        if 'saturated_fat' in levels:
            saturated_fat = levels['saturated_fat']
        if 'fat' in levels:
            fat = levels['fat']
        
        food_item.set_nutrient_levels(salt, sugars, saturated_fat, fat)
        
        
    return food_item