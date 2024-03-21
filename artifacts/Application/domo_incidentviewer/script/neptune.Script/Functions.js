var GS_INCIDENTS = {};

function convertDate(ZDATE) {
    const inputDate = ZDATE;
    const year = inputDate.substring(0, 4);
    const month = inputDate.substring(4, 6);
    const day = inputDate.substring(6, 8);

    var formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

function convertTime(ZTIME) {
    const inputTime = ZTIME;
    const hour = inputTime.substring(0, 2);
    const minute = inputTime.substring(2, 4);
    const second = inputTime.substring(4, 6);

    var formattedTime = `${hour}:${minute}:${second}`;
    return formattedTime;
}

function selectListFirstItem() {
    var items = ListIncidents.getItems();
    ListIncidents.removeSelections();

    if (items.length > 0) {
        ListIncidents.setSelectedItem(items[0]);
        ListIncidents.fireItemPress();
    }
}
