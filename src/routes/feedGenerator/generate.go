package feedgenerator

import (
	"fmt"
	"time"

	"adrian-villanueva.com/src/markdownRenderer"
	"github.com/gorilla/feeds"
)

func generateFeed(postsTime []markdownRenderer.PostIndex) *feeds.Feed {
	var feedItems []*feeds.Item
	for _, post := range postsTime {
		link := &feeds.Link{Href: fmt.Sprintf("https://adrian-villanueva.com/blog/%s", post.File)}
		author := &feeds.Author{Name: "Adrian Villanueva"}
		feed := &feeds.Item{
			Title:       post.Title,
			Link:        link,
			Author:      author,
			Description: "test",
			Created:     post.Date,
		}
		feedItems = append(feedItems, feed)
	}

	feed := &feeds.Feed{
		Title:       "Adrian-villanueva.com",
		Link:        &feeds.Link{Href: "https://adrian-villanueva.com/"},
		Description: "My blog entries",
		Author:      &feeds.Author{Name: "Adrian Villanueva"},
		Created:     time.Now(),
	}
	feed.Items = feedItems
	return feed
}
