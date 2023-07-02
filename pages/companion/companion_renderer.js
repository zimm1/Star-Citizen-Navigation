window.resizeTo(350,450)

const { PythonShell } = require('python-shell')
const { setPOI } = require('../../utils/db');

const OPTIONS = {
    mode: 'text',
    args: ["companion"]
};

const ERROR_MESSAGE = "Something Wrong Happened. \nPlease see the error below \nIf anything shows up please report the issue to Valalol#1790 on Discord";


const pyshell = new PythonShell('backend.py', OPTIONS);


const parseNewDataFloat = (field) => {
    return parseFloat(newData[field].split(" : ")[1])
}

const main = () => {
    let newData = null;

    pyshell.on('stderr', (stderr) => {
        console.log(stderr)
        window.resizeTo(350, 850)

        document.getElementById("companion_status_icon").src = '../../Images/red_dot.png';
        document.getElementById("companion_status_message").innerText = ERROR_MESSAGE
        document.getElementById("companion_error_message").innerText = err
    });
    pyshell.on('error', (err) => {
        console.log(err)
        window.resizeTo(350, 850)

        document.getElementById("companion_status_icon").src = '../../Images/red_dot.png';
        document.getElementById("companion_status_message").innerText = ERROR_MESSAGE
        document.getElementById("companion_error_message").innerText = err
    });
    pyshell.on('message', (message) => {
        console.log(message)
        if (message.startsWith("New data : ")) {
            newData = JSON.parse(message.slice(11));

            document.getElementById("companion_updated").innerText = newData["updated"]
            document.getElementById("companion_player_X_global_coordinate").innerText = newData["player_global_x"]
            document.getElementById("companion_player_Y_global_coordinate").innerText = newData["player_global_y"]
            document.getElementById("companion_player_Z_global_coordinate").innerText = newData["player_global_z"]
            document.getElementById("distance_changed").innerText = newData["distance_change"]
            document.getElementById("companion_player_container").innerText = newData["actual_container"]
            document.getElementById("companion_player_X_local_coordinate").innerText = newData["player_local_x"]
            document.getElementById("companion_player_Y_local_coordinate").innerText = newData["player_local_y"]
            document.getElementById("companion_player_Z_local_coordinate").innerText = newData["player_local_z"]
            document.getElementById("companion_player_longitude").innerText = newData["player_long"]
            document.getElementById("companion_player_latitude").innerText = newData["player_lat"]
            document.getElementById("companion_player_height").innerText = newData["player_height"]
            document.getElementById("companion_OM1").innerText = newData["player_OM1"]
            document.getElementById("companion_OM2").innerText = newData["player_OM2"]
            document.getElementById("companion_OM3").innerText = newData["player_OM3"]
            document.getElementById("companion_closest_poi").innerText = newData["closest_poi"]
            console.log("Succefully updated the GUI")
        }
    });

    home_img = document.getElementById("home_img");
    save_img = document.getElementById("save_img");

    home_img.addEventListener('click', function () {
        link = "../menu/menu.html?ignore_choices=true";
        window.location.href = link;
    }, false);

    save_img.addEventListener('click', function () {
        if (newData?.actual_container?.startsWith("Actual Container :")) {
            container = newData["actual_container"].split(" : ")[1];
            
            poiName = "AAAAAAAAAAA";

            setPOI(
                poiName,
                container,
                parseNewDataFloat("player_local_x"),
                parseNewDataFloat("player_local_y"),
                parseNewDataFloat("player_local_z"),
                false
            );
        } 
    }, false);
}

main();
