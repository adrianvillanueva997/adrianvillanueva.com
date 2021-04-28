package markdownRenderer

import (
	"bytes"
	"fmt"
	"io/fs"
	"io/ioutil"
	"log"
	"time"

	"github.com/yuin/goldmark"
	emoji "github.com/yuin/goldmark-emoji"
	highlighting "github.com/yuin/goldmark-highlighting"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

const (
	layoutISO = "2006-01-02"
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
type PostSiteMap struct {
	Title       string
	Date        string
	File        string
	Tags        string
	Description string
	Category    string
}

func InitBlogParser() (goldmark.Markdown, bytes.Buffer, parser.Context) {
	md := goldmark.New(goldmark.WithExtensions(meta.Meta))
	var buffer bytes.Buffer
	mdContext := parser.NewContext()
	return md, buffer, mdContext
}

func InitPostParser() (goldmark.Markdown, bytes.Buffer, parser.Context) {
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
	return md, buf, mdContext
}

func ParseBlogEntries(file fs.FileInfo, md goldmark.Markdown, buffer bytes.Buffer, mdContext parser.Context) PostIndex {
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
	return PostIndex{
		Title: fmt.Sprintf("%v", metadata["Title"]),
		Date:  convertedDate,
		File:  file.Name(),
	}
}
func ParseSiteMapEntries(file fs.FileInfo, md goldmark.Markdown, buffer bytes.Buffer, mdContext parser.Context) PostSiteMap {
	markdownFile, err := ioutil.ReadFile("./src/markdown/" + file.Name())
	if err != nil {
		log.Println(err)
	}
	err = md.Convert(markdownFile, &buffer, parser.WithContext(mdContext))
	if err != nil {
		log.Println(err)
	}
	metadata := meta.Get(mdContext)
	if err != nil {
		log.Println(err)
	}
	return PostSiteMap{
		Title:       fmt.Sprintf("%v", metadata["Title"]),
		Date:        fmt.Sprintf("%v", metadata["Date"]),
		File:        file.Name(),
		Category:    fmt.Sprintf("%v", metadata["Category"]),
		Tags:        fmt.Sprintf("%v", metadata["Tags"]),
		Description: fmt.Sprintf("%v", metadata["Description"]),
	}
}
