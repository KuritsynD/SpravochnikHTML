var timeout = 5000; // Частота обновления данных в миллисекундах
var device = "";
var modem = "";

function OnLoad()
{
    //var paramValue = window.location.href.split("?")[1].split("=")[1];
    //$("#userLogin").text(paramValue);
    //$("#userLogin").val(paramValue);
    GetModems();
    GetDevices();
    GetData();
}

function ShowFullInfo()
{
    alert(
        'хуй'
    )
}

function GetModems()
{
    $.get('../php/getdata.php', {func: "GetModems", userLogin: $("#userLogin").val()}, function(data){
        var arr = $.parseJSON(data);
        
        for(var i = 0; i < arr.length; i++)
        {
            for(let key in arr[i])
            {
                $("#modems").append('<button type="button" class="btn btn-primary btn-modem" imei="' + arr[i][key] +'" onclick="ChangeModem(' + arr[i][key] + ');">' + key + '</button>');
                if(i == 0)
                {
                    modem = arr[i][key];
                }
            }
        }
    });
}

function GetDevices(){
    $.get('../php/getdata.php', {func: "GetDevices", imei: modem}, function(data){
        $("#devices").empty();
        var arr = $.parseJSON(data);

        for(var i = 0; i < arr.length; i++)
        {
            for(let key in arr[i])
            {
                $("#devices").append('<button type="button" class="btn btn-primary btn-device" imei="' + key +'" onclick="ChangeDevice(`' + key + '`);">' + key + '</button>');
                if(i == 0)
                {
                    device = key;
                }
            }
        }
    });
}

// Вывод данных из базы
function GetData()
{
    console.log("Get_DATA");
    $.getJSON('http://gpsgenesis.ru/php/getdata.php', {func: "GetData", imei: modem, device_descr: device}, function(data) {

        if(data != null)
        {
            $("#param1").text(data["param1"]);
            $("#param2").text(data["param2"]);
            $("#param3").text(data["param3"]);
            $("#param4").text(data["param4"]);
            $("#param5").text(data["param5"]);
            $("#param6").text(data["param6"]);
            $("#param7").text(data["param7"]);
            $("#param8").text(data["param8"]);
            $("#param9").text(data["param9"]);
            $("#param10").text(data["param10"]);
            $("#param11").text(data["param11"]);
            $("#param12").text(data["param12"]);
            $("#state").text(data["state"]);
        }
        else{
            $("#param1").text(0);
            $("#param2").text(0);
            $("#param3").text(0);
            $("#param4").text(0);
            $("#param5").text(0);
            $("#param6").text(0);
            $("#param7").text(0);
            $("#param8").text(0);
            $("#param9").text(0);
            $("#param10").text(0);
            $("#param11").text(0);
            $("#param12").text(0);
            $("#state").text(0); 
        }
    });

    setTimeout(GetData, timeout);
}

function ChangeModem(imei)
{
    modem = imei;

    GetDevices();
    GetData();
}

function ChangeDevice(descr)
{
    device = descr;

    GetData();
}