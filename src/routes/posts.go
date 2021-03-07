package routes

import (
	"bytes"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yuin/goldmark"
	emoji "github.com/yuin/goldmark-emoji"
	highlighting "github.com/yuin/goldmark-highlighting"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
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
		md := goldmark.New(goldmark.WithExtensions(extension.Footnote, extension.DefinitionList, extension.GFM,
			extension.Typographer, emoji.Emoji, meta.Meta,
			highlighting.NewHighlighting(highlighting.WithStyle("monokai"), highlighting.WithFormatOptions())),
			goldmark.WithParserOptions(
				parser.WithAutoHeadingID(),
			),
			goldmark.WithRendererOptions(
				html.WithHardWraps(),
				html.WithXHTML(),
			))
		var buf bytes.Buffer
		mdContext := parser.NewContext()
		err = md.Convert(markdownFile, &buf, parser.WithContext(mdContext))
		if err != nil {
			log.Println(err)
			context.HTML(http.StatusInternalServerError, "error.tmpl.html", nil)
			context.Abort()
			return
		}
		metadata := meta.Get(mdContext)
		log.Println(metadata["Title"])
		postHTML := template.HTML(buf.String())
		title := metadata["Title"]
		post := Post{Title: fmt.Sprintf("%v", title), Content: postHTML}
		context.HTML(http.StatusOK, "post.tmpl.html", gin.H{
			"Title": post.Title, "Content": post.Content,
		})
	}
}
