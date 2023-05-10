let user = {
    name: '',
};

function loadStorage() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        user = savedUser;
    }
}

loadStorage();
