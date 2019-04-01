import json
import requests
from firebase import firebase
import csv
################################################################################
## Will receive barcode and pass it though the open_food_facts api
## Prints json to terminal
##
## Example URL: https://world.openfoodfacts.org/api/v0/product/[barcode].json
##
## Example Barcode: 737628064502
##
################################################################################

baseUrl = "https://world.openfoodfacts.org/api/v0/product/"
firebase = firebase.FirebaseApplication('https://yeesusfreezus.firebaseio.com/', None)
# ref = db.reference('')

result = firebase.get('/location/')


print('Firebase stuff:' + result)

print("\n")


dates = []
barcodes = []

################################################################################
## Read in barcode.csv file that stores the barcodes scanned from the camera
##
## Format: Date, Barcode
################################################################################

# with open('barcodes.csv') as csvfile:
#     readCSV = csv.reader(csvfile, delimiter=',')
#     for row in readCSV:
#         dates.append(row[0])
#         barcodes.append(row[1])


#hardoded for testing, comment out later!
barcode = "737628064502"


r = requests.get(url=baseUrl+'json?print=pretty')


print(r.json())