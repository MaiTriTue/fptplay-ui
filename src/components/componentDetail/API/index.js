function API(postApi) {
    fetch(postApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (post) {
            console.log(post);
            return post;
        })
        .catch((err) => {
            console.log(err);
        });
}

export default API;
