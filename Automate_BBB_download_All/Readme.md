# Download All BBB videos at once
### Update:
- Use auto.py file for GUI free script
- Selenium library and chromedriver no longer needed unless you use the GUI version of downloadAll.py
### Dependencies:
- python 3
- selenium library for python
- chrome webdriver executable in this directory
- requests library for python
- BeautifulSoup4 library for Python 

### To run:
- Do a change in the source code of downloadAll.py file highlighted by a comment
- run the downloadAll.py

### Output:
- Console will continuously give download updates
- All files will be stored in the Recordings directory
- Copy Recordings directory into server directory to serve files on /api/download/:filename