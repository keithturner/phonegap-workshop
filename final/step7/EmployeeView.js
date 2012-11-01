var EmployeeView = function(employee) {

    this.render = function() {
        this.el.html(EmployeeView.template(this.employee));
        return this;
    };

    this.addLocation = function(event) {
        event.preventDefault();
        console.log('addLocation');
        navigator.geolocation.getCurrentPosition(
            function(position) {
                $('.location', this.el).html(position.coords.latitude + ',' +position.coords.longitude);
            },
            function() {
                alert('Error getting location');
            });
        return false;
    };

    this.addToContacts = function(event) {
        event.preventDefault();
        console.log('addToContacts');
        var contact = navigator.contacts.create();
        contact.name = {givenName: app.currentEmployee.firstName, familyName:  app.currentEmployee.lastName};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', app.currentEmployee.officePhone, false);
        phoneNumbers[1] = new ContactField('mobile', app.currentEmployee.cellPhone, true); // preferred number
        contact.phoneNumbers = phoneNumbers;
        contact.save();
        return false;
    };

    this.changePicture = function(event) {
        event.preventDefault();
        console.log('changePicture');
        var options =   {   quality: 50,
                            destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                            encodingType: 0     // 0=JPG 1=PNG
                        };

        navigator.camera.getPicture(
            function(imageData) {
                $('#image').attr('src', "data:image/jpeg;base64," + imageData);
            },
            function() {
                alert('Error taking picture');
            },
            options);

        return false;
    };

    this.employee = employee;

    this.el = $('<div/>')

    this.el.on('click', '.add-location-btn', this.addLocation);
    this.el.on('click', '.add-contact-btn', this.addToContacts);
    this.el.on('click', '.change-pic-btn', this.changePicture);

}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());