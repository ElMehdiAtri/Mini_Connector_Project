var random = require('./Random_Str');
var Time = require('./Time')
const mqtt = require('mqtt');
const { exec } = require('child_process');


//const broker = 'mqtt://broker.hivemq.com';
//var mqttClient = mqtt.connect();
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
const InTopic = 'Topic_In';
const OutTopic = 'Topic_Out';
const Command = 'Topic_Querry';
const Response = 'Topic_Response';

//"use-strict";
// Let the user input the number of devices and put it in a loop where he can enter as much devices as he can!
const ps = require("prompt-sync")
const prompt = ps();
var Stamp;
var i = 0;
let Devices = [];
var Device_Type = [];
var ID = 0;
var Data;
var Unique_ID = ' ';
var State = [];
var command;
let Device_Number = prompt('Enter the number of devices :');
for (var i = 0; i < Device_Number; i++) {

  let type = prompt('Enter the device type (Passive/Active) :');
  Device_Type.push(type.toString().trim());

  ID = i+1;

  Unique_ID = (random(10));

  let State = prompt('Enter the device State (On/Off) :');
  //Device_state.push(type.toString().trim());

  //var device = {Device_ID: ID[i], Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Data: 'Data'};
  var device = {Device_ID: ID, Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Time_Stamp: Stamp, Data: Data};
  Devices.push(device);
}
console.log('The devices are: ' + JSON.stringify(Devices));
process.stdout.write('Press (Done) to configure devices and send Data' + "\n");
let input;
process.stdin.on('readable', () => {
    while ((input = process.stdin.read()) !== null) {
        if (input == 'Done\r\n')
        {
          Testfunction();
          let client = exec('node Server.js');
          client.stdout.on('data', (data) => {
            console.log(data);
          });
        }
    }
});

function intervalFunc()
{
  dev.Data = Number(Math.floor(Math.random() * 10));
  //var device = {Device_ID: ID[i], Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Time_Stamp: Stamp, Data: 'Data'};
  dev.Time_Stamp = Time();
  var obj = JSON.stringify(dev);
  mqttClient.publish(InTopic, obj);
}
function ActiveFunc()
{
  dev.Data = Number(Math.floor(Math.random() * 20));
  //var device = {Device_ID: ID[i], Device_Type: Device_Type[i] , Data_ID: Unique_ID, Device_State: State, Time_Stamp: Stamp, Data: 'Data'};
  dev.Time_Stamp = Time();
  var obj = JSON.stringify(dev);
  console.log('The Device with the ID: ' + dev.Device_ID + ' is preparing to send Data' + '\n');
  //console.log('receiving data: ' + command);
  //console.log(obj);
}

function Testfunction(){
  process.stdout.write("\n"+"Preparing to send Data..."+"\n");
  for (i = 0; i < Devices.length; i++)
    {
    dev = Devices[i];
    if ((dev.Device_Type.toLowerCase() === 'passive') && (dev.Device_State.toLowerCase() === 'on'))
    { //console.log('The Device with the ID: ' + dev.Device_ID + ' is preparing to send Data' + '\n');
      setInterval(intervalFunc,3000);}

    if ((dev.Device_Type.toLowerCase() === 'active') && (dev.Device_State.toLowerCase() === 'on') && (dev.Device_ID.toString() === command) )
    {setTimeout(ActiveFunc, 1000);}

    if (dev.Device_State.toLowerCase() ==! 'on')
    {console.log('The Device with the ID: ' + dev.Device_ID + ' isn t operating at the moment.' + '\n');}
    }
}
mqttClient.on('connect', function () {
    console.log('Client connected to Mqtt broker' );
});
