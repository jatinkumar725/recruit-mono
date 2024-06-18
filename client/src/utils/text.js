const truncateText = (text, length = 20) => {
    if (text.length > length){
        return text.substring(0, length) + '...';
    }
    return text;
};

export {
    truncateText
}