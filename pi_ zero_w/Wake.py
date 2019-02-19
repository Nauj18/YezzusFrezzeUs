#!/usr/bin/env python

import sys
import time

if len(sys.argv) > 1:
   delay = float(sys.argv[1])
else:
   delay = 0.001

loops = int(10.0 / delay)

start=time.time()

for i in range(loops):
   time.sleep(delay)

end=time.time()

print("expected={:0.7f}, actual={:0.7f}, loops={}".format(delay, (end-start)/loops, loops))