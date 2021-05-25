package main

import (
	"net/http"
)


func main() {
    // http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
    //     fmt.Fprintf(w, "Welcome to my website!")
    // })

    // fs := http.FileServer(http.Dir("web/__sapper__/export/"))
    // http.Handle("/static/", http.StripPrefix("/static/", fs))

    // http.ListenAndServe(":8080", nil)
    fs := http.FileServer(http.Dir("web/__sapper__/export/"))
    http.Handle("/", fs)
    http.ListenAndServe(":8080", nil)
}
