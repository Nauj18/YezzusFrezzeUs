# import packages
from picamera.array import PiRGBArray
from picamera import PiCamera
import time
import cv2

# init camera
camera = PiCamera()
rawCapture = PiRGBArray(camera)

# let camera warm up
time.sleep(0.1)

# grab image from camera
camera.capture(rawCapture, format="bgr")
image = rawCapture.array

#display the image on screen and wait for a keypress
cv2.imshow("Image", image)
cv2.waitKey(0)
