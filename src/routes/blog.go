package routes

import (
	"io/ioutil"
	"log"
	"net/http"
	"sort"

	markdownrenderer "adrian-villanueva.com/src/markdownRenderer"
	"github.com/gin-gonic/gin"
)

const (
	layoutISO = "2006-01-02"
)

func BlogHandler() func(context *gin.Context) {
	return func(context *gin.Context) {
		var postsTime []markdownrenderer.PostIndex
		files, err := ioutil.ReadDir(DIRNAME)
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusNotFound, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		md, buffer, mdContext := markdownrenderer.InitBlogParser()
		for _, file := range files {
			post := markdownrenderer.ParseBlogEntries(file, md, buffer, mdContext)
			postsTime = append(postsTime, post)
		}
		sort.Slice(postsTime, func(i, j int) bool { return postsTime[i].Date.Unix() > postsTime[j].Date.Unix() })
		var posts []markdownrenderer.PostFinal
		for _, post := range postsTime {
			posts = append(posts, markdownrenderer.PostFinal{
				Title: post.Title,
				Date:  post.Date.Format(layoutISO),
				File:  post.File,
			})
		}
		context.HTML(http.StatusOK, "blog.tmpl.html", gin.H{
			"posts": posts,
			"title": "Blog",
		})
	}
}
