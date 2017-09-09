const formatDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return [year, month, day].map(formatNumber).join('-');
}

const formatTime = date => {
    const hour = date.getHours();
    const minute = date.getMinutes();

    return [hour, minute].map(formatNumber).join(':');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

module.exports = {
    formatDate: formatDate,
    formatTime: formatTime
}
