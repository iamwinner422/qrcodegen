const changeLinkToName = (url) => {
    const res = url.split("://");
    if (res.length > 1) {
        return res[1].replace(/\//g, "-")
    }
    return url;
}
export default changeLinkToName;
