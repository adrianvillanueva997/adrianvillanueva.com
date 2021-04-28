package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreatedPosts struct {
	FileName string
}

const DIRNAME = "src/markdown/"

func IndexHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusOK, "index.tmpl.html", gin.H{
			"title": "Adrián Villanueva",
		})
	}
}
