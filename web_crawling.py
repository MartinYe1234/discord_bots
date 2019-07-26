#import statements
import requests
from bs4 import BeautifulSoup

#access page
page = requests.get("https://en.wikipedia.org/wiki/Nuclear_power")
soup = BeautifulSoup(page.content,'lxml')
root1 = "https://en.wikipedia.org/"

a = soup.find_all('a')
links = [link.get('href') for link in a]
print(links)
for link in links:
    root2 = link
    print(root2)
    next_page = root1 + root2
    page2 = requests.get(next_page)
    soup2 = BeautifulSoup(page2.content, 'lxml')
    print(next_page)
