package main

import (
	// "fmt"
	"net/http"
)

func main() {
	// http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
	//     fmt.Fprintf(w, "Welcome to my website!")
	// })
	// http.ListenAndServe(":8080", nil)

	fs := http.FileServer(http.Dir("/app/web/__sapper__/export/"))
	http.Handle("/", fs)
	http.ListenAndServe(":8080", nil)
}
