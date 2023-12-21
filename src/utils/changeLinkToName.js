const changeLinkToName = (url) => {
    const res = url.split("://");
    return res[1].replace(/\//g, "-");
}
export default changeLinkToName;
