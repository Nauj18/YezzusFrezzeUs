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
## Example UID: 03xQBYKBLFMhgEheyNTPFtV4LUi2
################################################################################

baseUrl = "https://world.openfoodfacts.org/api/v0/product/"
firebase = firebase.FirebaseApplication('https://yeesusfreezus.firebaseio.com/', None)

dates = []
barcodes = []

UP

def readCSVFile(dates,barcodes):
    with open('barcodes.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            if row == 1:
                UID = row
            else:
                dates.append(row[0])
                barcodes.append(row[1])


#hardoded for testing, comment out later!
barcode = "737628064502"
uID = '03xQBYKBLFMhgEheyNTPFtV4LUi2'


def getBarcodeInfo():
    r = requests.get(url=baseUrl+barcode+'json?print=pretty')
    productData = r.json()


def getFirebase():
    result = firebase.get('',None)
    print (result)

################################################################################
## TODO: get Json Information and post it to firebase with the right format
################################################################################
def postFirebase():
    firebase.put('',+uID+'Location/Freezer/'+dates,barcode)