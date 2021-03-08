package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func FeedHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusOK, "feed.tmpl.html", gin.H{
			"title": "Feed",
		})
	}
}
