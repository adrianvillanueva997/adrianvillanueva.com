package feedgenerator

import (
	"io/ioutil"
	"log"
	"net/http"
	"sort"

	"adrian-villanueva.com/src/markdownRenderer"
	"adrian-villanueva.com/src/routes"
	"github.com/gin-gonic/gin"
)

func JSONFeedHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		var postsTime []markdownRenderer.PostIndex
		files, err := ioutil.ReadDir(routes.DIRNAME)
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
		feed := generateFeed(postsTime)
		rss, err := feed.ToJSON()
		if err != nil {
			log.Fatal(err)
		}
		context.Header("Content-Type", "application/json")
		context.String(http.StatusOK, rss)
	}
}
