from pyzbar import pyzbar
from picamera.array import PiRGBArray
from picamera import PiCamera
import argparse
import time
import cv2

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True, help="path to input image")
args = vars(ap.parse_args())
image = cv2.imread(args["image"])
#camera = PiCamera()
#rawCapture = PiRGBArray(camera)

#time.sleep(0.1)

#camera.capture(rawCapture,format="bgr")

#image = rawCapture.array
barcodes = pyzbar.decode(image)

for barcode in barcodes:
	(x, y, w, h) = barcode.rect
	cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

	barcodeData = barcode.data.decode("utf-8")
	barcodeType = barcode.type

	text = "{} ({})".format(barcodeData, barcodeType)
	cv2.putText(image, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

	print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))

cv2.imshow("Image", image)
cv2.waitKey(0)
