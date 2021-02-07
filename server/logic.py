import time
import requests
import datetime
import sys
from bs4 import BeautifulSoup

def download_file(url):
    local_filename = url.split('/')[-1]
    curr=datetime.datetime.now()
    curr_str = str(curr.day)+'_'+str(curr.month)+'_'+str(curr.year)+'_'+str(curr.hour)+'_'+str(curr.minute)+'_'+str(curr.second)+'_'
    local_filename = curr_str+local_filename
    r = requests.get(url, stream=True)
    with open('./Recordings/'+local_filename, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024): 
            if chunk: 
                f.write(chunk)
    return local_filename

def download(link):
    name=download_file(link)
    return name

def fetch(url):
    r=requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    src = ''
    for vid in soup.find_all('source'):
        src=vid.get('src')
        break
        
    print(download(url+'/'+src))

if len(sys.argv) == 0:
    print('error')
else : 
    fetch(sys.argv[1])
