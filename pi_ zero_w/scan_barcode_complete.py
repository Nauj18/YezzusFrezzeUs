from pyzbar import pyzbar
from imutils.video import VideoStream
from picamera.array import PiRGBArray
from picamera import PiCamera
import requests
import argparse
import datetime
import time
import cv2

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", help="path to input image")
ap.add_argument("-o", "--output", type=str, default="barcodes.csv", help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())
image = cv2.imread(args["image"])
#camera = PiCamera()
#rawCapture = PiRGBArray(camera)

#time.sleep(0.1)

#camera.capture(rawCapture,format="bgr")

#image = rawCapture.array

# Create csv files for read barcodes
csv  = open(args["output"], "w")
found = set()
#if image:
#    barcodes = pyzbar.decode(image)
#    print(barcodes)

# Init video stream
print("[INFO] starting video stream...")
vs = VideoStream(usePiCamera=False).start()
time.sleep(2.0)

while True:
    
    frame = vs.read()
    
    (h, w) = frame.shape[:2]
    r = 500 / float(w)
    dim = (500, int(h * r))
    frame  = cv2.resize(frame, dim, cv2.INTER_AREA)
    
    #  Find barcodes
    barcodes = pyzbar.decode(frame)

    for barcode in barcodes:

        barcodeData = barcode.data.decode("utf-8")
        barcodeType = barcode.type

        text = "{} ({})".format(barcodeData, barcodeType)

        # Check set and add barcode
        if barcodeData not in found:
            csv.write("{}, {}\n".format(datetime.datetime.now(), barcodeData))
            csv.flush()
            found.add(barcodeData)
            
            url_string = "https://world.openfoodfacts.org/api/v0/product/%s.json" % (barcodeData)
            # url_string = "https://world.openfoodfacts.org/api/v0/product/5034660520191.json"
            r = requests.get(url=url_string)
    
            print(r.json()["product"]["product_name"])

# Close file and exit
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
