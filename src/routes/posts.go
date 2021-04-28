package routes

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	markdownrenderer "adrian-villanueva.com/src/markdownRenderer"
	"github.com/gin-gonic/gin"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/parser"
)

type Post struct {
	Title       string
	Content     template.HTML
	Description string
	Tags        string
}

func PostHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		postName := context.Param("postName")
		markdownFile, err := ioutil.ReadFile(fmt.Sprintf("./src/markdown/%s", postName))
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusNotFound, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		md, buf, mdContext := markdownrenderer.InitPostParser()
		err = md.Convert(markdownFile, &buf, parser.WithContext(mdContext))
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusInternalServerError, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		metadata := meta.Get(mdContext)
		postHTML := template.HTML(buf.String()) //nolint:golint
		title := metadata["Title"]
		tags := metadata["Tags"]
		description := metadata["Description"]
		post := Post{
			Title:       fmt.Sprintf("%v", title),
			Content:     postHTML,
			Tags:        fmt.Sprintf("%v", tags),
			Description: fmt.Sprintf("%v", description),
		}
		context.HTML(http.StatusOK, "post.tmpl.html", gin.H{
			"title": post.Title, "content": post.Content, "tags": post.Tags, "description": post.Description,
		})
	}
}
