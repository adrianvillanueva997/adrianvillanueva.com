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
	Title   string
	Content template.HTML
}

func PostHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		postName := context.Param("postName")
		markdownFile, err := ioutil.ReadFile("./src/markdown/" + postName)
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
		postHTML := template.HTML(buf.String())
		title := metadata["Title"]
		post := Post{Title: fmt.Sprintf("%v", title), Content: postHTML}
		context.HTML(http.StatusOK, "post.tmpl.html", gin.H{
			"Title": post.Title, "Content": post.Content,
		})
	}
}
