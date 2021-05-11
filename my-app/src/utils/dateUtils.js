export const formatDateWithTime = (dateTime) => {
    if (dateTime) {
        return new Intl.DateTimeFormat('en-AU', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: 'numeric', minute: 'numeric',
            hourCycle: 'h23',
            timeZone: 'Australia/Brisbane'
        }).format(new Date(dateTime));
    } else {
        return null;
    }
}

export const formatDate = (date) => {
    if (date) {
        return new Intl.DateTimeFormat('en-AU', {
            year: '2-digit', month: '2-digit', day: '2-digit',
            timeZone: 'Australia/Brisbane'
        }).format(new Date(date));
    } else {
        return null;
    }
}