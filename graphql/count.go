package main

import (
	"encoding/json"
	"github.com/olivere/elastic"
	"io/ioutil"
	"net/http"
	"strconv"
)

func CountBlogs(response http.ResponseWriter, request *http.Request) {
	if !ManageCors(response, request) {
		return
	}
	if request.Method != http.MethodPut {
		handleError("register http method not Put", http.StatusBadRequest, response)
		return
	}
	var countdata map[string]interface{}
	body, err := ioutil.ReadAll(request.Body)
	if err != nil {
		handleError("error getting request body: "+err.Error(), http.StatusBadRequest, response)
		return
	}
	err = json.Unmarshal(body, &countdata)
	if err != nil {
		handleError("error parsing request body: "+err.Error(), http.StatusBadRequest, response)
		return
	}
	var searchterm string
	if countdata["searchterm"] != nil {
		var ok bool
		searchterm, ok = countdata["searchterm"].(string)
		if !ok {
			handleError("searchterm cannot be cast to string", http.StatusBadRequest, response)
			return
		}
	}
	var count int64
	if len(searchterm) > 0 {
		queryString := elastic.NewQueryStringQuery(searchterm)
		count, err = Elastic.Count().
			Index(BlogElasticIndex).
			Query(queryString).
			Pretty(false).
			Do(CTXElastic)
	} else {
		count, err = Elastic.Count().
			Index(BlogElasticIndex).
			Query(nil).
			Pretty(false).
			Do(CTXElastic)
	}
	if err != nil {
		handleError(err.Error(), http.StatusBadRequest, response)
		return
	}
	response.Header().Set("content-type", "application/json")
	response.Write([]byte(`{"count":` + strconv.FormatInt(count, 10) + `}`))
}
