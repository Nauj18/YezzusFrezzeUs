import json
import requests
import datetime
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
#uniqueItemID = 1

################################################################################
## TODO: Agree on CSV file format
################################################################################
def readCSVFile(dates,barcodes):
    with open('barcodes.csv') as csvfile:
        readCSV = csv.reader(csvfile, delimiter=',')
        for row in readCSV:
            if row == 1:
                UID = row
            else:
                dates.append(row[0])
                barcodes.append(row[1])
            #uniqueItemID+=1

def getBarcodeInfo(barcode):
    r = requests.get(url=baseUrl+barcode+'json?print=pretty')
    productData = r.json()
    #uniqueItemID+=1

    for item in productData:
        if(item=='product'):
            for item2 in productData['product']:
                #print(item2)
                if(item2 == 'generic_name'):
                    name = productData['product']['generic_name']
                    #print(name)
                if(item2 == 'quantity'):
                    quantity = productData['product']['quantity']
                    #print(quantity)
                if(item2 == 'expiration_date'):
                    experation = productData['product']['expiration_date']
                    #print(experation)

    

    return {'Barcode':barcode,'Expiration_Date':experation,'Input_Date': datetime.datetime.now(),'Name':name,'Quantity':quantity}




def getFirebase():
    result = firebase.get('',None)
    print (result)

def postFirebase(path,data):
    firebase.put('',path,data)
    
#hardoded for testing, comment out later!
barcode = '737628064502'
uniqueItemID = '1'
location = 1

if(location==1):
    path = 'Location/Freezer/'+ uniqueItemID
elif(location==2):
    path = 'Location/Fridge/'+ uniqueItemID
elif(location==3):
    path = 'Location/Pantry/'+ uniqueItemID

#readCSVFile()

postFirebase(path,getBarcodeInfo(barcode))