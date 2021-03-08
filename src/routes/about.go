package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AboutHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusOK, "about.tmpl.html", gin.H{
			"title": "About",
		})
	}
}
