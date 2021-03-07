package routes

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreatedPosts struct {
	FileName string
}

const DIRNAME = "./src/markdown/"

func IndexHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		var posts []string
		files, err := ioutil.ReadDir(DIRNAME)
		if err != nil {
			log.Fatal(err)
		}
		for _, file := range files {
			posts = append(posts, file.Name())
		}
		context.HTML(http.StatusOK, "index.tmpl.html", gin.H{
			"posts": posts,
		})
	}
}
