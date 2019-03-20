from pyzbar import pyzbar
from picamera.array import PiRGBArray
from picamera import PiCamera
import argparse
import time
immport csv
import cv2

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="path to input image")
args = vars(ap.parse_args())
image = cv2.imread(args["image"])

csv = open(args["output"], "w")
found = set()
#camera = PiCamera()
#rawCapture = PiRGBArray(camera)

#time.sleep(0.1)

#camera.capture(rawCapture,format="bgr")

#image = rawCapture.array
barcodes = pyzbar.decode(image)

# I added this to debug barcode images not working
print(barcodes)

for barcode in barcodes:
	(x, y, w, h) = barcode.rect
	cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

	barcodeData = barcode.data.decode("utf-8")
	barcodeType = barcode.type

	text = "{} ({})".format(barcodeData, barcodeType)
	cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
	
	# This is also in video script... we want to do this here too for now to get data in a way that is presentable to react
	if barcodeData not in found:
		csv.write("{}, {}\n".format(datetime.datetime.now(), barcodeData))
		csv.flush()
		found.add(barcodeData)

	print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))

cv2.imshow("Image", image)
cv2.waitKey(0)
