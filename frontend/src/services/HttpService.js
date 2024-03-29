export const GetWithoutAuth = (url) => {
    var request = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    })

    return request.then(res => res.json());
}

export const DeleteWithoutAuth = (url,id) => {
    var request = fetch(url+id, {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        }
    })

    return request
}

export const PostWithoutAuth = (url,body) => {
    let request = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    })
    return request;
}

export const PutWithoutAuth = (url,body) => {
    let request = fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
    })
    return request;
}