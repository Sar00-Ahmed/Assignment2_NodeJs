async function removeExtraSpaces(text){
    cleantext = await text.replace(/\s+/g,' ').trim();
    return cleantext;
}

module.exports = {
    removeExtraSpaces
}