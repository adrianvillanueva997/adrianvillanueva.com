package routes

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func FeedHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		var posts []string
		files, err := ioutil.ReadDir(DIRNAME)
		if err != nil {
			log.Fatal(err)
		}
		for _, file := range files {
			posts = append(posts, file.Name())
		}
		context.JSON(http.StatusOK, "")
	}
}
