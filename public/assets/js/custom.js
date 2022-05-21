/*
|--------------------------------------------------------------------------
| On Load
|--------------------------------------------------------------------------
| .....
*/
$(function () {
    $("#chqd").hide();
});

/*
|--------------------------------------------------------------------------
| form Validations rules and methods
|--------------------------------------------------------------------------
| .....
*/
$(function () {
    var ValidationRules = {
        fbnk: { required: true },
        fbkb: { required: true },
        fbac: { required: true },
        tbnk: { required: true },
        tbkb: { required: true },
        tbac: { required: true },
        tfcg: { required: false },
        amnt: { required: true },
        endt: { required: true },
        desc: { required: false },

        bnno: { required: false },
        bndt: { required: true },
        marf: {
            required: false,
            uniqueManRef: function (element) {
                return $("#marf").val() != "";
            },
        },
    };

    // form submit
    $("#save").on("click", function (e) {
        //  console.log(e);
        buttonLoaderDisable(e); //disable button loader

        var isValid = formSubmit(ValidationRules);

        if (isValid) {
            document.forms["mfrm"].submit();
        }

        buttonLoaderEnable(e); //enable button loader
    });

    //Unique manual ref
    $.validator.addMethod(
        "uniqueManRef",
        function (value, element) {
            var tempStatus = false;
            $.ajax({
                type: "GET",
                url: manualref_unique_route,
                async: false,
                data: {
                    value: value,
                    id: $("#rqid").val(),
                },
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                beforeSend: function () {
                    add_inputLoader(element);
                    cursorWait();
                },
                success: function (status) {
                    if (status) {
                        tempStatus = false;
                    } else {
                        tempStatus = true;
                    }
                    remove_inputLoader(element);
                    cursorDefault();
                },
                error: function () {
                    add_inputLoader(element);
                    cursorDefault();
                },
            }).fail(function (xhr, status, textStatus, error) {
                located(xhr);
            });

            return tempStatus;
        },
        "The manual ref you provided already exists"
    );
});

//handle form submit
function formSubmit(validationRules) {
    $("#mfrm").validate().destroy();

    $("#mfrm").validate({
        onsubmit: false,
        onkeyup: false,
        onkeydown: false,
        onclick: false,
        onkeypress: false,
        onblur: true,
        ignore: [],
        rules: validationRules,
        errorPlacement: function (error, element) {
            if (element.hasClass("selectpicker")) {
                error.insertAfter(element.parent());
            } else if (element.hasClass("input-group-element")) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
    });

    if ($("#mfrm").valid()) {
        return true;
    } else {
        warningAlert();
    }
}

/*
|--------------------------------------------------------------------------
| File upload
|--------------------------------------------------------------------------
| .....
*/

//on button click
$("#atcb").on("click", function (e) {
    $("#atch").click();
});

//on acttchment change
$("#atch").on("change", function (e) {
    //get file name from path and set
    $("#atfl").text($("#atch").val().split("\\").pop().split("/").pop());
});

/* Withdraw Bank change */
$("#fbnk").on("change", function (e) {
    //get selected value
    $("#fbkb").selectpicker("val", "");
    $("#fbkb").find("option").remove();
    $("#fbkb").selectpicker("refresh");

    //reset acc no
    $("#fbac").selectpicker("val", "");
    $("#fbac").find("option").remove();
    $("#fbac").selectpicker("refresh");
    var selected = $("select[name=fbnk]").val();

    //get branch of the selected bank
    if (selected) {
        getBranchList(selected, "#fbkb");
    }
});

function getBranchList(selected, id) {
    $.ajax({
        type: "GET",
        url: "https://oncordia.com/control/api/bankbranch/" + selected,
        async: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        beforeSend: function () {
            // add_inputLoader('#employeeCard');
            //cursorWait();
        },
        success: function (data, status) {
            let filterdBranch = data.filter(
                (itm) => baranchIdList.indexOf(itm.wbb) != -1
            );

            var html = `<option></option>`;

            if (filterdBranch.length > 0) {
                filterdBranch.map((itm, key) => {
                    html +=
                        `<option value='` +
                        itm.wbb +
                        `' data-subtext="` +
                        itm.brc +
                        `">` +
                        itm.bln +
                        `</option>`;
                });
            }

            $(id).append(html);
            $(id).selectpicker("refresh");
            // return html;
        },
        error: function () {
            cursorDefault();
        },
    }).fail(function (xhr, status, textStatus, error) {
        located(xhr);
    });
}

//branch change
$("#fbkb").on("change", function (e) {
    //get selected value
    $("#fbac").selectpicker("val", "");
    $("#fbac").find("option").remove();
    $("#fbac").selectpicker("refresh");
    var selected = $("select[name=fbkb]").val();

    //get branch of the selected bank
    if (selected) {
        getAccountNoList(selected, "#fbac");
    }
});

//get bank account details
function getAccountNoList(selected, id) {
    $.ajax({
        type: "POST",
        url: get_bank_account_no_route,
        async: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: {
            branchId: selected,
        },
        beforeSend: function () {
            // add_inputLoader('#employeeCard');
            //cursorWait();
        },
        success: function (data, status) {
            var html = `<option></option>`;
            if (data.sts == 1 && data.data.length > 0) {
                data.data.map((itm, key) => {
                    html +=
                        `<option value='` +
                        itm.aci +
                        `' data-subtext='` +
                        new Intl.NumberFormat("en", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                        }).format(itm.total) +
                        `'>` +
                        itm.ban +
                        `</option>`;
                });
            }

            $(id).append(html);
            $(id).selectpicker("refresh");
        },
        error: function () {
            cursorDefault();
        },
    }).fail(function (xhr, status, textStatus, error) {
        located(xhr);
    });
}

/* To Bank change */
$("#tbnk").on("change", function (e) {
    //get selected value
    $("#tbkb").selectpicker("val", "");
    $("#tbkb").find("option").remove();
    $("#tbkb").selectpicker("refresh");

    //reset acc no
    $("#tbac").selectpicker("val", "");
    $("#tbac").find("option").remove();
    $("#tbac").selectpicker("refresh");
    var selected = $("select[name=tbnk]").val();

    //get branch of the selected bank
    if (selected) {
        getBranchList(selected, "#tbkb");
    }
});

//branch change
$("#tbkb").on("change", function (e) {
    //get selected value
    $("#tbac").selectpicker("val", "");
    $("#tbac").find("option").remove();
    $("#tbac").selectpicker("refresh");
    var selected = $("select[name=tbkb]").val();

    //get branch of the selected bank
    if (selected) {
        getAccountNoList(selected, "#tbac");
    }
});
