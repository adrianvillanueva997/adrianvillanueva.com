package sitemap

import (
	"fmt"
	"io/ioutil"
	"log"

	markdownrenderer "adrian-villanueva.com/src/markdownRenderer"
	"adrian-villanueva.com/src/routes"
	"github.com/ikeikeikeike/go-sitemap-generator/v2/stm"
)

func parsePosts() []stm.URL {
	files, err := ioutil.ReadDir(routes.DIRNAME)
	var postsData []markdownrenderer.PostSiteMap
	if err != nil {
		log.Fatalln(err)
	}
	md, buffer, mdContext := markdownrenderer.InitBlogParser()
	for _, file := range files {
		post := markdownrenderer.ParseSiteMapEntries(file, md, buffer, mdContext)
		postsData = append(postsData, post)
	}
	var sites []stm.URL
	for _, post := range postsData {
		site := stm.URL{{"loc", fmt.Sprintf("/blog/%s", post.File)}, {"publication", stm.URL{
			{"title", post.Title}, {"language", "en"},
		},
		},
			{"title", post.Title},
			{"keywords", post.Tags},
			{"category", post.Category},
			{"access", "public"},
			{"publication_date", post.Date},
		}
		sites = append(sites, site)
	}
	return sites
}

func GenerateSiteMap() {
	sm := stm.NewSitemap(1)
	sm.SetDefaultHost("https://adrian-villanueva.com")
	sm.SetSitemapsHost("https://adrian-villanueva.com/")
	sm.SetFilename("sitemap")
	sm.SetSitemapsPath("")
	sm.SetCompress(false)
	sm.SetVerbose(false)
	sm.Create()
	sm.Add(stm.URL{{"loc", "/"}, {"mobile", true}})
	sm.Add(stm.URL{{"loc", "/about"}, {"mobile", true}})
	sm.Add(stm.URL{{"loc", "/resume"}, {"mobile", true}})
	sm.Add(stm.URL{{"loc", "/feed"}, {"mobile", true}})
	posts := parsePosts()
	sm.Add(stm.URL{{"loc", "/blog"}, {"mobile", true},
		{"news", posts}})

	sm.Add(stm.URL{{"loc", "/images"},
		{"image", []stm.URL{
			{{"loc", "http://www.example.com/image.png"}, {"title", "Image"}},
			{{"loc", "http://www.example.com/image1.png"}, {"title", "Image1"}},
		}},
	})
	sm.Finalize()
}
