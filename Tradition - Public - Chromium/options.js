document.getElementById("set").addEventListener("click", function() {
  chrome.storage.sync.remove("classes", function(){
    console.log("Class Data Deleted");
    setTimeout(() => {window.close()},500);
  });
});