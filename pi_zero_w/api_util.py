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
    
    json_item['name'] = food_item.name
    json_item['expiration_date'] = food_item.expiration_date
    json_item['quantity'] = food_item.quantity
    
    if hasattr(food_item, 'ingredients'):
        json_item['ingredients'] = food_item.ingredients
        
    
    if hasattr(food_item, 'allergies'):
        json_item['allergies'] = food_item.allergies
        
            
    if hasattr(food_item, 'image'):
        json_item['image'] = food_item.image
        
            
    if hasattr(food_item, 'categirues'):
        json_item['ingredients'] = food_item.ingredients
        
            
    if hasattr(food_item, 'ingredients'):
        json_item['ingredients'] = food_item.ingredients
        
            
    if hasattr(food_item, 'ingredients'):
        json_item['ingredients'] = food_item.ingredients
        
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
def post_item(json_item):
    # Find last unique item ID
    last_ID = get_firebase('/Location/Fridge/Size')

    if last_ID == None:
        last_ID = 0
    else:
        last_ID = int(last_ID)
        
    new_ID = last_ID + 1
    
    # Update last unique item ID
    post_firebase('/Location/Fridge/Size/', new_ID)
    
    # Location is hardcoded to fridge right now
    path = 'Location/Fridge/' + str(last_ID)
    # if(location==1):
    #     path = 'Location/Freezer/'+ unique_item_ID
    # elif(location==2):
    #     path = 'Location/Fridge/'+ unique_item_ID
    #  elif(location==3):
    #     path = 'Location/Pantry/'+ unique_item_ID

    post_firebase(path, json_item)
    
def post_item_test():
    print(str(datetime.datetime.now())[:10].replace('-', '/'))
    # json_item = send_barcode_request('737628064502')
    # print(json_item)
    # post_firebase('Location/Freezer/1', json_item)