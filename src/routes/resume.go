package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResumeHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusOK, "resume.tmpl.html", gin.H{
			"title": "Resume",
		})
	}
}
