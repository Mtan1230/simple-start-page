function myFunction(){
    // Store search keyword
    var x = document.getElementById("search").value;
    const url = "https://www.google.com/";
    var url1 = url + x;
    var win = window.open(url1, '_blank');
    win.focus;
}
