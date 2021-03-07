package routes

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/yuin/goldmark"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/parser"
)

type PostIndex struct {
	Title string
	Date  time.Time
	File  string
}

type PostFinal struct {
	Title string
	Date  string
	File  string
}

const (
	layoutISO = "2006-01-02"
	layoutUS  = "2006, January 2"
)

func BlogHandler() func(context *gin.Context) {
	return func(context *gin.Context) {
		var postsTime []PostIndex
		files, err := ioutil.ReadDir(DIRNAME)
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusNotFound, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		md := goldmark.New(goldmark.WithExtensions(meta.Meta))
		var buffer bytes.Buffer
		mdContext := parser.NewContext()
		for _, file := range files {
			log.Println(file.Name())
			markdownFile, err := ioutil.ReadFile("./src/markdown/" + file.Name())
			if err != nil {
				log.Println(err)
			}
			err = md.Convert(markdownFile, &buffer, parser.WithContext(mdContext))
			if err != nil {
				log.Println(err)
			}
			metadata := meta.Get(mdContext)
			convertedDate, err := time.Parse(layoutISO, fmt.Sprintf("%v", metadata["Date"]))
			if err != nil {
				log.Println(err)
			}
			postsTime = append(postsTime, PostIndex{
				Title: fmt.Sprintf("%v", metadata["Title"]),
				Date:  convertedDate,
				File:  file.Name(),
			})
		}
		sort.Slice(postsTime, func(i, j int) bool { return postsTime[i].Date.Unix() > postsTime[j].Date.Unix() })
		var posts []PostFinal
		for _, post := range postsTime {
			posts = append(posts, PostFinal{
				Title: post.Title,
				Date:  post.Date.Format(layoutISO),
				File:  post.File,
			})
		}
		context.HTML(http.StatusOK, "blog.tmpl.html", gin.H{
			"posts": posts,
		})
	}
}
