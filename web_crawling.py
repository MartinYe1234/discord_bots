#import statements
import requests
from bs4 import BeautifulSoup

#visit page
link = "https://www.w3schools.com/html/html_classes.asp"
page = requests.get(link)
soup = BeautifulSoup(page.content,'html.parser')

#simulate bot --> search is pic we want
root = "https://www.google.com/search?q="
search = str(input())

#websites to visit
to_visit = []
#images to choose from
images = []

#access body
body = soup.body
print(body.contents)
a_tags = body.find_all('img')
links = [link.get('src') for link in a_tags]
print(links)
