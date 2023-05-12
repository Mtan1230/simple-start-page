function myFunction(){
    // Store search keyword
    var x = document.getElementById("search");
    const url = "https://www.google.com/?#q=text_to_search";
    window.open(url);
    var url1 = url + x;
    var win = window.open(url1, '_blank');
    win.focus;
}
