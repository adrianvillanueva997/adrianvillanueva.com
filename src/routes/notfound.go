package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func NotFoundHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusNotFound, "error.tmpl.html", gin.H{
			"title": "404 - Page not found",
		})
	}
}
