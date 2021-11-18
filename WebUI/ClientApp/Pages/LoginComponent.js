$(document).ready(function () {
    LoginComponent.checkBrowser();
    //LoginComponent.InitalizeComponent();
});
var LoginComponent;
(function (LoginComponent) {
    var sys = new SystemTools();
    var sysPar = new SystemParameters();
    var cmbLanguage;
    var OnLoggedUrl = "";
    var txtUserName;
    var txtUserPassword;
    var chkRemember;
    var btnLogin;
    var btnBack;
    var txtYear;
    var hLoggedName;
    var spnLoggedYear;
    var cmbBranch;
    var cmbCompany;
    var login_;
    var vSysTimeOut = " 30";
    var compData = Array();
    var SystemEnv = new SystemEnvironment();
    var SysSession = GetSystemSession();
    var G_BRANCHService = new Array();
    function InitalizeComponent() {
        txtUserName = document.getElementById("txtUserName");
        txtUserPassword = document.getElementById("txtUserPassword");
        chkRemember = document.getElementById("chkRemember");
        btnLogin = document.getElementById("btnLogin");
        //btnBack = document.getElementById("btnBack");
        login_ = document.getElementById("login_");
        cmbLanguage = document.getElementById("cmbLanguage");
        txtYear = document.getElementById("txtYear");
        hLoggedName = DocumentActions.GetElementById("hLoggedName");
        spnLoggedYear = DocumentActions.GetElementById("spnLoggedYear");
        cmbCompany = document.getElementById("cmbCompany");
        cmbBranch = document.getElementById("cmbBranch");
        OnLoggedUrl = $("#OnLogged").val();
        //btnBack.addEventListener("click", GoBack);
        btnLogin.addEventListener("click", Login);
        login_.addEventListener("click", Gologin);
        cmbCompany.onchange = function () { cmbCompany_Onchange(Number(cmbCompany.value), SystemEnv.ScreenLanguage); };
        //MessageBox
        var loginData = localStorage.getItem("Inv1_Login_Data");
        if (loginData != null) {
            var data = JSON.parse(loginData);
            txtUserName.value = data.USER_CODE;
            txtUserPassword.value = data.USER_PASSWORD;
            txtYear.value = "2021";
            cmbLanguage.value = data.Language;
            chkRemember.checked = true;
        }
        else {
            txtYear.value = "2021";
        }
    }
    LoginComponent.InitalizeComponent = InitalizeComponent;
    function checkBrowser() {
        // Get the user-agent string
        var userAgentString = navigator.userAgent;
        // Detect Chrome
        var chromeAgent = userAgentString.indexOf("Chrome") > -1;
        if (userAgentString == "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1"
            || "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb)AppleWebKit/ 534.46.0 (KHTML, like Gecko)CriOS / 19.0.1084.60 Mobile/ 9B206 Safari/ 7534.48.3"
            || "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)AppleWebKit/ 602.1.50 (KHTML, like Gecko) CriOS/ 56.0.2924.75 Mobile / 14E5239e Safari/ 602.1") {
            chromeAgent = true;
        }
        // Detect Internet Explorer
        var IExplorerAgent = 
        //User - Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/ 79.0.3945.74 Safari/ 537.36 Edg/ 79.0.309.43
        userAgentString.indexOf("MSIE") > -1 ||
            userAgentString.indexOf("rv:") > -1;
        // Detect Firefox
        var firefoxAgent = userAgentString.indexOf("Firefox") > -1;
        // Detect Safari
        var safariAgent = userAgentString.indexOf("Safari") > -1;
        var EdgeAgent = userAgentString.indexOf("Edge") > -1;
        // Discard Safari since it also matches Chrome
        if ((chromeAgent) && (safariAgent))
            safariAgent = false;
        // Detect Opera
        var operaAgent = userAgentString.indexOf("OP") > -1;
        // Discard Chrome since it also matches Opera
        if ((chromeAgent) && (operaAgent))
            chromeAgent = false;
        if (safariAgent || IExplorerAgent || operaAgent || firefoxAgent || EdgeAgent) {
            var mg = "يجب الدخول من متصفح جوجل كروم" + "You must log in from Google Chrome";
            MessageBox.Show(mg, "");
        }
        else {
            InitalizeComponent();
        }
    }
    LoginComponent.checkBrowser = checkBrowser;
    function Login() {
        var userName = txtUserName.value;
        var userPassword = txtUserPassword.value;
        var user = new G_USERS();
        user.USER_CODE = userName;
        user.USER_PASSWORD = userPassword;
        var year = $("#txtYear").val();
        txtUserName.style.borderColor = "";
        txtUserPassword.style.borderColor = "";
        var lang = "ar";
        if (cmbLanguage.selectedIndex == 0)
            lang = "ar";
        else
            lang = "en";
        SystemEnv.ScreenLanguage = lang;
        SystemEnv.CurrentYear = txtYear.value;
        SystemEnv.UserCode = userName;
        SystemEnv.CompanyNameAr = "";
        var dt = new Date();
        var timenow = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        localStorage.setItem("LastAccess", timenow);
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("G_USERS", "UserLogin"),
            data: { UserCode: user.USER_CODE, Password: user.USER_PASSWORD },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = res.Response;
                    if (result != null && result.USER_CODE != null) {
                        // $("#divLogin").css("display", "none");
                        $("#div_pass").css("display", "none");
                        $("#divCompanies").css("display", "block");
                        $("#divCompanies").removeClass("display_none ");
                        $("#btn_login_1").addClass("display_none");
                        $("#btn_login_2").addClass("display_none");
                        $("#btn_login_3").removeClass("display_none");
                        SystemEnv.Token = result.Tokenid;
                        SystemEnv.UserType = result.USER_TYPE;
                        SystemEnv.SalesManID = result.SalesManID;
                        SystemEnv.CashBoxID = result.CashBoxID;
                        //SystemEnv.StoreID = result.StoreID;  
                        document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        Ajax.Callsync({
                            type: "GET",
                            url: sys.apiUrl("SystemTools", "GetAppSettings"),
                            data: { userCode: user.USER_CODE, SystemCode: 'I', SubSystemCode: 'I' },
                            success: function (d) {
                                compData = d;
                                cmbCompany.innerHTML = "";
                                if (user.USER_CODE == "safe") {
                                    compData.forEach(function (comp, index) {
                                        cmbCompany.add(new Option(lang == "en" ? (index + 1) + " - " + comp.CompanyNameE.toString() : (index + 1) + " - " + comp.CompanyNameA.toString(), comp.CompanyCode.toString()));
                                    });
                                }
                                else {
                                    compData.forEach(function (comp, index) {
                                        cmbCompany.add(new Option(lang == "en" ? comp.CompanyNameE.toString() : comp.CompanyNameA.toString(), comp.CompanyCode.toString()));
                                    });
                                }
                            }
                        });
                        var compCode = Number(cmbCompany.value);
                        localStorage.setItem("comCode", cmbCompany.value);
                        cmbCompany_Onchange(compCode, lang);
                        if (chkRemember.checked == true) {
                            var loginData = {
                                USER_CODE: userName,
                                Year: txtYear.value,
                                Language: cmbLanguage.value,
                            };
                            localStorage.setItem("Inv1_Login_Data", JSON.stringify(loginData));
                        }
                        hLoggedName.innerText = user.USER_CODE;
                        GoToCompanySelect();
                    }
                    else {
                        txtUserName.style.borderColor = "red";
                        txtUserPassword.style.borderColor = "red";
                    }
                }
                else {
                    alert(res.ErrorMessage);
                    return;
                }
            }
        });
    }
    function GoToCompanySelect() {
        $("#tblLogin").css("display", "none");
        $("#tblCompany").css("display", "block");
        document.getElementById("btnOk").addEventListener("click", function () {
            var compCode = $("#cmbCompany").val();
            var braCode = $("#cmbBranch").val();
            var company = compData.filter(function (x) { return x.CompanyCode == cmbCompany.value; })[0];
            var isActive = company.IsActive;
            SystemEnv = GetSystemEnvironment();
            if (isActive) {
                $.ajax({
                    type: "GET",
                    url: sys.apiUrl("I_VW_GetCompStatus", "GetStat"),
                    data: { Compcode: compCode, yr: Number(txtYear.value) },
                    async: false,
                    success: function (d) {
                        var res = d;
                        if (res.IsSuccess) {
                            var CompanyStatus = res.Response;
                            var status = CompanyStatus.CompStatus;
                            var masg = CompanyStatus.LoginMsg;
                            if (status == 0 || status == 1 || status == 2) {
                                //if (status == 1 || status == 2) {
                                MessageBox.Show(CompanyStatus.LoginMsg, "");
                                $.ajax({
                                    type: "GET",
                                    url: sys.apiUrl("I_Control", "GetAll"),
                                    data: { Compcode: compCode },
                                    async: false,
                                    success: function (d) {
                                        var res = d;
                                        if (res.IsSuccess) {
                                            var CompanyService = res.Response;
                                            if (CompanyService != null) {
                                                debugger;
                                                SystemEnv.I_Control = CompanyService;
                                                SystemEnv.CompCode = compCode;
                                                SystemEnv.BranchCode = braCode;
                                                SystemEnv.CompanyName = company.CompanyNameE;
                                                SystemEnv.CompanyNameAr = company.CompanyNameA;
                                                SystemEnv.CurrentYear = txtYear.value;
                                                SystemEnv.IsBiLingual = true;
                                                SystemEnv.Language = cmbLanguage.value;
                                                SystemEnv.ScreenLanguage = cmbLanguage.value;
                                                SystemEnv.SystemCode = 'I';
                                                SystemEnv.SubSystemCode = 'I';
                                                SystemEnv.UserCode = txtUserName.value;
                                                SystemEnv.StartDate = CompanyStatus.FirstDate.substr(0, 10);
                                                SystemEnv.EndDate = CompanyStatus.LastDate.substr(0, 10);
                                                //SystemEnv.I_Control.SysTimeOut = CompanyService.SysTimeOut; 
                                                //SystemEnv.SysTimeOut = CompanyService.SysTimeOut; 
                                                SystemEnv.NationalityID = CompanyService[0].NationalityID;
                                                //SystemEnv.InvoiceWithoutCust = CompanyService[0].InvoiceWithoutCust; 
                                                //SystemEnv.IvoiceDateEditable = CompanyService[0].IvoiceDateEditable; 
                                                //SystemEnv.InvoiceLineDiscount = CompanyService[0].InvoiceLineDiscount; 
                                                //SystemEnv.InvoiceLineAllowance = CompanyService[0].InvoiceLineAllowance; 
                                                //SystemEnv.InvoiceTotalAllowance = CompanyService[0].InvoiceTotalAllowance; 
                                                //SystemEnv.InvoiceTotalCharge = CompanyService[0].InvoiceTotalCharge; 
                                                //SystemEnv.OperationPriceWithVAT = CompanyService[0].OperationPriceWithVAT; 
                                                //SystemEnv.SalesPriceWithVAT = CompanyService[0].SalesPriceWithVAT; 
                                                //SystemEnv.IsLocalBranchCustomer = CompanyService[0].IsLocalBranchCustomer; 
                                                //SystemEnv.GL_VoucherCCDT_Type = CompanyService[0].GL_VoucherCCDT_Type; 
                                                debugger;
                                                $.ajax({
                                                    type: "GET",
                                                    url: sys.apiUrl("GBranch", "GetBranch"),
                                                    data: { CompCode: Number(compCode), BRA_CODE: Number(braCode) },
                                                    async: true,
                                                    success: function (d) {
                                                        var res = d;
                                                        if (res.IsSuccess) {
                                                            G_BRANCHService = res.Response;
                                                            if (G_BRANCHService != null) {
                                                                //SystemEnv.NationalityID = G_BRANCHService[0].NationalityID;
                                                                SystemEnv.SlsInvType = G_BRANCHService[0].SlsInvType;
                                                                SystemEnv.WholeInvoiceTransCode = G_BRANCHService[0].WholeInvoiceTransCode;
                                                                SystemEnv.RetailInvoicePayment = G_BRANCHService[0].RetailInvoicePayment;
                                                                SystemEnv.WholeInvoicePayment = G_BRANCHService[0].WholeInvoicePayment;
                                                                SystemEnv.ServiceInvoiceTransCode = G_BRANCHService[0].ServiceInvoiceTransCode;
                                                                SystemEnv.ReturnTypeCode = G_BRANCHService[0].ReturnTypeCode;
                                                                SystemEnv.InvoiceTypeCode = G_BRANCHService[0].InvoiceTypeCode;
                                                                SystemEnv.RetailInvoiceTransCode = G_BRANCHService[0].RetailInvoiceTransCode;
                                                            }
                                                            else {
                                                                var msg = SystemEnv.ScreenLanguage == "ar" ? "غير مصرح لك الدخول الفرع" : "You are not allowed to login";
                                                                MessageBox.Show(msg, "");
                                                            }
                                                        }
                                                    }
                                                });
                                                document.cookie = "Inv1_systemProperties=" + JSON.stringify(SystemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                                                OnLogged();
                                            }
                                            else {
                                                var msg = SystemEnv.ScreenLanguage == "ar" ? "غير مصرح لك الدخول للنظام" : "You are not allowed to login";
                                                MessageBox.Show(msg, "");
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                MessageBox.Show(CompanyStatus.LoginMsg, "", function () {
                                    window.location.href = "/Login/HomePage";
                                });
                            }
                        }
                    }
                });
            }
            else {
                var mg = SystemEnv.ScreenLanguage == "ar" ? "هذه الشركة غير متاحة" : "This company is not Active";
                MessageBox.Show(mg, "");
            }
        });
    }
    function OnLogged() {
        // set api session values 
        APiSession.Session.BranchCode = SystemEnv.BranchCode;
        APiSession.Session.CompCode = SystemEnv.CompCode;
        APiSession.Session.SystemCode = SystemEnv.SystemCode;
        APiSession.Session.SubSystemCode = SystemEnv.SubSystemCode;
        APiSession.Session.ScreenLanguage = SystemEnv.ScreenLanguage;
        APiSession.Session.UserCode = SystemEnv.UserCode;
        APiSession.Session.CurrentYear = $("#txtYear").val();
        $.ajax({
            url: OnLoggedUrl,
            success: function (result) {
                var obj = result.result;
                window.location.href = obj.url;
            }
        });
    }
    function GoBack() {
        $("#divCompanies").addClass("display_none");
        $("#div_pass").addClass("display_none");
    }
    function Gologin() {
        $("#div_pass").removeClass("display_none");
        $("#btn_login_1").addClass("display_none");
        $("#btn_login_2").removeClass("display_none");
    }
    function cmbCompany_Onchange(compCode, lang) {
        Ajax.Callsync({
            type: "GET",
            url: sys.apiUrl("SystemTools", "GetBranchsUser"),
            data: { compCode: compCode, userCode: txtUserName.value },
            success: function (d) {
                var res = d;
                if (res.IsSuccess == true) {
                    var result = res.Response;
                    cmbBranch.innerHTML = "";
                    result.forEach(function (bra, index) {
                        var text = bra.BRA_CODE.toString() + "- " + (lang == "en" ? bra.BRA_DESCE : bra.BRA_DESC);
                        cmbBranch.add(new Option(text, bra.BRA_CODE.toString()));
                    });
                }
            }
        });
    }
})(LoginComponent || (LoginComponent = {}));
//# sourceMappingURL=LoginComponent.js.map 
//# sourceMappingURL=LoginComponent.js.map