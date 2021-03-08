package routes

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/gorilla/feeds"

	"adrian-villanueva.com/src/markdownRenderer"
	"github.com/gin-gonic/gin"
)

func FeedHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		var postsTime []markdownRenderer.PostIndex
		files, err := ioutil.ReadDir(DIRNAME)
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusNotFound, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		md, buffer, mdContext := markdownRenderer.InitBlogParser()
		for _, file := range files {
			post := markdownRenderer.ParseBlogEntries(file, md, buffer, mdContext)
			postsTime = append(postsTime, post)
		}
		sort.Slice(postsTime, func(i, j int) bool { return postsTime[i].Date.Unix() > postsTime[j].Date.Unix() })
		var feedItems []*feeds.Item
		for _, post := range postsTime {
			link := &feeds.Link{Href: fmt.Sprintf("https://adrian-villanueva.com/blog/%s", post.File)}
			author := &feeds.Author{Name: "Adrian Villanueva"}
			feed := &feeds.Item{
				Title:   post.Title,
				Link:    link,
				Author:  author,
				Created: post.Date,
			}
			feedItems = append(feedItems, feed)
		}
		feed := &feeds.Feed{
			Title:       "Title of Your Feeds",
			Link:        &feeds.Link{Href: "your feed link"},
			Description: "Description of your feeds",
			Author:      &feeds.Author{Name: "author name"},
			Created:     time.Now(),
		}
		feed.Items = feedItems
		rss, err := feed.ToRss()
		if err != nil {
			log.Fatal(err)
		}
		context.XML(http.StatusOK, rss)
	}
}
