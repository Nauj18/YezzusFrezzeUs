
# Imports
from imutils.video import VideoStream
from pyzbar import pyzbar
import argparse
import datetime
import imutils
import time
import cv2

# Init argument parser
ap = argparse.ArgumentParser()
ap.add_argument("-o", "--output", type=str, default="barcodes.csv", help="path to output CSV file containing barcodes")
args = vars(ap.parse_args())

# Init video stream
print("[INFO] starting video stream...")
vs = VideoStream(usePiCamera=True).start()
time.sleep(2.0)

# Create csv files for read barcodes
csv  = open(args["output"], "w")
found = set()

# Loop over the frames
while True:
	# Shorten the frame to 400 pixels to help run faster
	frame = vs.read()
	# print("pre-resize")
	# frame = imutils.resize(frame, width=400)

	# print("Resized")

	(h, w) = frame.shape[:2]
	r = 500 / float(w)
	dim = (500, int(h * r))
	frame  = cv2.resize(frame, dim, cv2.INTER_AREA)

	#  Find barcodes
	barcodes = pyzbar.decode(frame)

	for barcode in barcodes:
		# Write the bounding box onto the image
		(x, y, w, h) = barcode.rect
		cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
		barcodeDate = barcode.data.decode("utf-8")
		barcodeType = barcode.type
		text = "{} ({})".format(barcodeDate, barcodeType)
		cv2.putText(frame, text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

		# Check set and add barcode
		if barcodeDate not in found:
			csv.write("{}, {}\n".format(datetime.datetime.now(), barcodeData))
			csv.flush()
			found.add(barcodeData)

		# Show output frame
		cv2.imshow("Barcode Scanner", frame)
		key = cv2.waitKey(1) & 0xFF

		# Break on q
		if key == ord("q"):
			break

# Close file and exit
print("[INFO] Cleaning up...")
csv.close()
cv2.destroyAllWindows()
vs.stop()
