# How to Run This Project
- Clone the repository
```
git clone https://github.com/arnab15/stackoverflow-crawler.git
```
- Install dependencies
```
cd stackoverflow-crawler
npm install
```
- now create a `.env` file in root of the project folder then copy `.env.examples` files data into it if you wnant to change env file you can change it
- Build and run the project
```
npm start
```

# How It's working
- first I had maintained an array as an tasks queue where I push all urls that I have to crawl
- In first run it extracts all urls from questions page then it pushes those urls into the tasks queue
- in next step it recursively pulls tasks one by one from tasks queue and crawl indivisual url and saves questions url upvotesCount, answers count and no of occurences count in mongodb database also in this step it crawl all related and suggested questions links and pushes them to tasks queue so that it will be able to create more tasks in queue and it's happening recursively whenever it crawling a indivisual question in case if it did not found any suggested or related url it crawls question page with increased pagenumber/next page number then it pushes crawled questions url into tasks queue.
- when the user kills the script it pulls all recoded that hasbeen saved in db and dump them into a csv file
- also i tried to maintained 5 concurrent request at a time.

