
#!/bin/bash

export PORT=5110

cd ~/www/tracker
./bin/tracker stop || true
./bin/tracker start