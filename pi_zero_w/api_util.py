import json
import requests
import datetime
from firebase import firebase
import off_parser
import datetime

################################################################################
## Open Food Facts (OFF) API used for obtaining nutritional information for
## food items.
##
## Example URL: https://world.openfoodfacts.org/api/v0/product/[barcode].json
##
## Example Barcode: 737628064502
##
## Example UID: 03xQBYKBLFMhgEheyNTPFtV4LUi2
################################################################################

OFF_BASE_URL = "https://world.openfoodfacts.org/api/v0/product/BARCODE.json"

################################################################################
## Send request to Open Food Facts to get back JSON data for inputted barcode
def send_barcode_request(barcode):
    r = requests.get(OFF_BASE_URL.replace('BARCODE', barcode))
    
    if not 'product' in r.json():
        print('ERROR: barcode %s not recognized' % barcode)
        return None
    
    raw_food_data = r.json()['product']
    
    food_item = off_parser.parse_food_item(raw_food_data)
    
    return food_item

################################################################################
## Take as input FoodItem object and turn it into a JSON object that can be
## stored in firebase
def jsonify_item(food_item):
    json_item = {}
    
    json_item['Name'] = food_item.name
    json_item['Expiration_Date'] = food_item.expiration_date
    json_item['Quantity'] = food_item.quantity
    
    if hasattr(food_item, 'Ingredients'):
        json_item['Ingredients'] = food_item.ingredients
        
    
    if hasattr(food_item, 'Allergies'):
        json_item['Allergies'] = food_item.allergies
        
            
    if hasattr(food_item, 'Image'):
        json_item['Image'] = food_item.image
        
            
    #if hasattr(food_item, 'Categories'):
    #    json_item['Categories'] = food_item.categories
        
            
    #if hasattr(food_item, 'Nutriments'):
    #    json_item['Nutriments'] = food_item.nutriments
        
            
    #if hasattr(food_item, 'Nutrient_Levels'):
    #    json_item['Nutrient_Levels'] = food_item.nutrient_levels
        
    return json_item


################################################################################
## Firebase used to store data... Pi barcodes -> firebase -> React app
##
## Firebase Console: https://console.firebase.google.com/u/0/?pli=1
##
## Gmail: YeezusANDFreezus@gmail.com
## Password: Yeet+123
##
## Example UID: 03xQBYKBLFMhgEheyNTPFtV4LUi2
################################################################################

firebase = firebase.FirebaseApplication('https://yeesusfreezus.firebaseio.com/', None)

################################################################################
## Returns firebase object
def get_firebase(path):
    return firebase.get(path,'')

################################################################################
## Post data to firebase
def post_firebase(path,data):
    firebase.put('',path,data)

################################################################################
## Takes JSON object representing food item data as input and stores it in database
def post_item(uid, json_item):
    # Find last unique item ID
    last_ID = get_firebase('/%s/Location/Fridge/Size' % uid)

    if last_ID == None:
        last_ID = 0
    else:
        last_ID = int(last_ID)
        
    new_ID = last_ID + 1
    
    # Update last unique item ID
    post_firebase('/%s/Location/Fridge/Size/' % uid, new_ID)
    
    # Location is hardcoded to fridge right now
    path = 'Location/Fridge/' + str(last_ID)
    # if(location==1):
    #     path = ('/%s/Location/Freezer/' % uid)+ unique_item_ID
    # elif(location==2):
    #     path = ('/%s/Location/Fridge/' % uid)+ unique_item_ID
    #  elif(location==3):
    #     path = ('/%s/Location/Pantry/' % uid)+ unique_item_ID

    post_firebase(path, json_item)
    
def post_item_test():
    print(str(datetime.datetime.now())[:10].replace('-', '/'))
    # json_item = send_barcode_request('737628064502')
    # print(json_item)
    # post_firebase('Location/Freezer/1', json_item)