$(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDxI1FligpJXRg47TgrouLzwXMDIWDSisM",
        authDomain: "employeedataman-c4217.firebaseapp.com",
        databaseURL: "https://employeedataman-c4217.firebaseio.com",
        projectId: "employeedataman-c4217",
        storageBucket: "",
        messagingSenderId: "243251409275",
        appId: "1:243251409275:web:6ff2a2b16c2b8dac8b0dde"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    let db = firebase.database()

    function addToDatabase(name, role, startDate, monthlyRate) {

        db
            .ref()
            .push({
                name: name,
                role: role,
                startDate: startDate,
                monthlyRate: monthlyRate
            })
    }

    db
        .ref()
        .on("child_added", function (snapshot) {

            let employeeName = snapshot.val().name,
                employeeRole = snapshot.val().role,
                employeeStartDate = snapshot.val().startDate,
                employeeMonthlyRate = snapshot.val().monthlyRate

            buildRow(employeeName, employeeRole, employeeStartDate, employeeMonthlyRate)

        })


    function buildRow(name, role, startDate, monthlyRate) {
        let newRecord = $("<tr>")
        let nameCol = $("<td>")
        let roleCol = $("<td>")
        let startDateCol = $("<td>")
        let monthlyRateCol = $("<td>")
        let monthsWorkedCol = $("<td>")
        let totalBilledCol = $("<td>")
        let startDateMoment = moment(startDate, "MM/DD/YYY");
        let monthsWorked = moment().diff(startDateMoment, "months");
        let totalBilled = monthsWorked * monthlyRate;

        nameCol.text(name)
        roleCol.text(role)
        startDateCol.text(startDate)
        monthlyRateCol.text(monthlyRate)
        monthsWorkedCol.text(monthsWorked)
        totalBilledCol.text(totalBilled)

        newRecord.append(nameCol)
        newRecord.append(roleCol)
        newRecord.append(startDateCol)
        newRecord.append(monthsWorkedCol)
        newRecord.append(monthlyRateCol)
        newRecord.append(totalBilledCol)

        $("#employeeDataTable").append(newRecord)

    }

    $("#add-employee").click(function () {
        event.preventDefault();
        let employeeName = $("#employeeName").val(),
            employeeRole = $("#employeeRole").val(),
            employeeStartDate = $("#employeeStartDate").val(),
            employeeMonthlyRate = $("#employeeMonthlyRate").val()

        addToDatabase(employeeName, employeeRole, employeeStartDate, employeeMonthlyRate)
    })

})