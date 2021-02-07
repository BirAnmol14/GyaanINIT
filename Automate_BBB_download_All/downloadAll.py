from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import datetime
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

def downloadList(driver):
    global total
    global page
    page = page+1
    table=driver.find_element_by_xpath('//*[@id="recording-table"]');
    table = table.find_elements_by_tag_name('tr')
    links=[]
    for tr in table:
        l= tr.find_elements_by_tag_name('td')
        obj={}
        td1 = l[0]
        divs = td1.find_elements_by_tag_name('div')
        if len(divs) == 2:
            name = divs[1].text
            obj['name']= ''.join('_'.join(name.split(' ')).split(','))
        
        td = l[len(l)-1]
        a = td.find_elements_by_tag_name('a')
        if(len(a)!=0):
            url = a[len(a)-1].get_attribute('href')
            obj['url'] = fetchDownloadLink(url)
            links.append(obj)

    driver.quit()  
    print('Generating File Names')
    total = total + len(links)
    for i in range(len(links)):
        links[i]['name']=download_file(links[i],False)
        print("Link "+ str(i+1)+" of "+ str(len(links)) + " on page "+str(page))
    
    return links

def list():
    
    driver=webdriver.Chrome()
    driver.get('https://webinar.hbcse.tifr.res.in/b/rs7-7hj-une')
    page_holder = driver.find_element_by_xpath('/html/body/div[2]/div[2]/div/div[2]/div/div/div/div/nav/ul')
    pages = page_holder.find_elements_by_tag_name('li')
    hrefs=[]
    for i in range(1,len(pages)-1):
        hrefs.append(pages[i].find_element_by_tag_name('a').get_attribute('href'))

    driver.quit()
    links =[]
    for href in hrefs:
        print(href)
        driver=webdriver.Chrome()
        driver.get(href)
        links.extend(downloadList(driver))
        
    
    print('***************')
    for i in range(len(links)):
        print("Downloading... "+ str(i+1) + " of "+str(total))
        print(links[i]['name'])
        download_file(links[i],False) #Pass True as the parameter
        print('Downloaded')

    print("Download Complete")
list()
