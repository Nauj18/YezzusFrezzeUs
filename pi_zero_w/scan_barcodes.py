from pyzbar import pyzbar
from imutils.video import VideoStream
from picamera.array import PiRGBArray
import csv
import requests
import json
import argparse
import datetime
import time
import cv2
import api_util

BARCODE_FILENAME = 'barcodes.csv'

###################################################
## Helper method for reading barcode CSV file, stores data
## in dates, barcodes+
def read_CSV_file(dates,barcodes):
    with open(BARCODE_FILENAME) as csvfile:
        read_csv = csv.reader(csvfile, delimiter=',')
        for row in read_csv:
            dates.append(row[0])
            barcodes.append(row[1])

###################################################
## Parse image arguments
# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--image", help="path to input image")
# args = vars(ap.parse_args())
# image = cv2.imread(args["image"])

# PICAMERA MODULE
#camera = PiCamera()
#rawCapture = PiRGBArray(camera)
#time.sleep(0.1)
#camera.capture(rawCapture,format="bgr")
#image = rawCapture.array

###################################################
## Init CSV

# Create csv files for read barcodes
csv  = open(BARCODE_FILENAME, "w")

###################################################
## Init Video Stream
print("[INFO] starting video stream...")
vs = VideoStream(usePiCamera=False).start()
time.sleep(2.0)

while True:
    frame = vs.read()
    
    # Resize (may or may not be needed)
    (h, w) = frame.shape[:2]
    r = 500 / float(w)
    dim = (500, int(h * r))
    frame  = cv2.resize(frame, dim, cv2.INTER_AREA)
    
    #  Find barcodes
    barcodes = pyzbar.decode(frame)

    for barcode in barcodes:

        # Decode data
        barcode_data = barcode.data.decode("utf-8")
        barcode_type = barcode.type

        text = "{} ({})".format(barcode_data, barcode_type)

        # Check set and Add barcode data to CSV
        csv.write("{}, {}\n".format(datetime.datetime.now(), barcode_data))
        csv.flush()

	# Get Pi's user ID from text file
	uidfile = open("/home/pi/fridgeCode/MyKitchenpkg/userid.txt")
	uid = uidfile.read().strip()
	print(uid)
            
        ######################
        ## SEND API REQUEST
            
        # Store object representing food item from open food facts data
        food_item = api_util.send_barcode_request(barcode_data)

        # Post JSON version of item to firebase
        if food_item:
            api_util.post_item(uid, api_util.jsonify_item(food_item))
        
        time.sleep(1.0)

###################################################
## Cleanup and Exit
print("[INFO] Cleaning up...")
csv.close()
cv2.destroyAllWindows()
vs.stop()



# for barcode in barcodes:
#    (x, y, w, h) = barcode.rect
#    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
#   barcodeData = barcode.data.decode("utf-8")
#    barcodeType = barcode.type
#   text = "{} ({})".format(barcodeData, barcodeType)
#    cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
#   print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))    
# Check set and add barcode
#   if barcodeData not in found:
#       csv.write("{}, {}\n".format(datetime.datetime.now(), barcodeData))
#      csv.flush()
#      found.add(barcodeData)
# url_string = "https://world.openfoodfacts.org/api/v0/product/%s.json" % (barcodeData)
# url_string = "https://world.openfoodfacts.org/api/v0/product/5034660520191.json"
# r = requests.get(url=url_string)   
#  print(r.json()["product"]["product_name"])
#cv2.imshow("Image", image)
#cv2.waitKey(0)