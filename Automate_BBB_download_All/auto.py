import time
import requests
import datetime
import sys
from bs4 import BeautifulSoup
total = 0
page = 0 
def download_file(links,download):
    url = links['url']
    local_filename = url.split('/')[-1]
    curr_str = links['name']
    local_filename = curr_str+'_'+local_filename
    if download ==True:
        r = requests.get(url, stream=True)
        with open('./Recordings/'+local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=1024): 
                if chunk: 
                    f.write(chunk)
                    
    return local_filename

def fetchDownloadLink(url):
    r=requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    src = ''
    for vid in soup.find_all('source'):
        src=vid.get('src')
        break
        
    return url+src

def scrapeVideoLinks(link):
    global total
    global page
    page = page+1
    print('Page: '+str(page))
    videos = []
    r=requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')
    tbody = soup.find('tbody')
    rows = tbody.find_all('tr')
    i=0
    for row in rows:
        tds = row.find_all('td')
        if len(tds)>1:
            td1 = tds[0]
            name = ''
            divs = td1.find_all('div')
            if len(divs) > 1:
                name  = divs[1].getText().strip()
            td = tds[len(tds)-1]
            alinks = td.find_all('a')
            if (len(alinks)>1):
                i=i+1
                total=total+1
                obj = {}
                obj['name'] = ''.join('_'.join(name.split(' ')).split(','))
                obj['url'] = fetchDownloadLink(alinks[len(alinks)-1].get('href').strip())
                obj['name'] = download_file(obj,False)
                print("Got link "+ str(i)+ " on page "+str(page))
                videos.append(obj)

    
    return videos

def fetch(url,path):
    r=requests.get(url+path)
    soup = BeautifulSoup(r.text, 'html.parser')
    pages = soup.find_all('li')
    links = []
    for i in range(1,len(pages)-1):
        link = pages[i].findChild()
        if (link is not None):
            links.append(url+link.get('href'))

    vidLinks =[]
    if len(links) != 0:
        for link in links:
            vidLinks.extend(scrapeVideoLinks(link))
    print('***************')
    for i in range(len(vidLinks)):
        print("Downloading... "+ str(i+1) + " of "+str(total))
        print(vidLinks[i]['name'])
        download_file(vidLinks[i],False) #Pass True as the parameter
        print('Downloaded')

    print("Download Complete")
fetch('https://webinar.hbcse.tifr.res.in','/b/rs7-7hj-une')
