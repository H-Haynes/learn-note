export async function search(type, keywords, page = 1, limit = 30) {
    return await fetch(`/search?keywords=${keywords}&type=${type}&limit=${limit}&offset=${(page-1)*10}`).then(res => {
        console.log(res)
    })
}

