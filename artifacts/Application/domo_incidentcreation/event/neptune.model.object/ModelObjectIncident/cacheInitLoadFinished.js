var offlineDataIncident = modelModelObjectIncident.getData();
console.log("Offline Data Log:");
console.log(offlineDataIncident);

// debugger;
if (Object.keys(offlineDataIncident).length === 0) {
  console.log('No offline data to load!');
} else {
  modelSimpleFormIncidents.setData(offlineDataIncident);
}

if (!AppCache.isOffline) {
    console.log("Online");

    ButtonCreateIncident.setVisible(true);
    ButtonSaveIncident.setVisible(false);
} else {
    console.log("Offline Data Log:");

    ButtonCreateIncident.setVisible(false);
    ButtonSaveIncident.setVisible(true);
}
