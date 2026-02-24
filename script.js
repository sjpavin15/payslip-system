function searchPayslip() {

    var contract = document.getElementById("contract").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;
    var empId = document.getElementById("empId").value.trim();

    var loader = document.getElementById("loader");
    var result = document.getElementById("result");

    result.innerHTML = "";
    loader.style.display = "block";
    loader.innerHTML = "Searching, please wait...";

    if (empId === "") {
        loader.style.display = "none";
        result.innerHTML = "<div class='error'>Please enter Employee ID</div>";
        return;
    }

    var fileURL = "https://raw.githubusercontent.com/sjpavin15/payslip-system/main/" 
                  + contract + "/" 
                  + year + "/" 
                  + month + "/" 
                  + empId + ".pdf";

    setTimeout(function () {

        fetch(fileURL)
            .then(function(response) {

                loader.style.display = "none";

                if (response.ok) {
                    result.innerHTML =
                        "<div class='success'>" +
                        "<b>Payslip Found</b><br><br>" +
                        "<a href='" + fileURL + "' target='_blank'>View Payslip</a><br>" +
                        "<a href='" + fileURL + "' download>Download Payslip</a>" +
                        "</div>";
                } else {
                    result.innerHTML =
                        "<div class='error'>Payslip not available for selected Month & Year</div>";
                }
            })
            .catch(function() {
                loader.style.display = "none";
                result.innerHTML =
                    "<div class='error'>Server connection error</div>";
            });

    }, 2000);
}