const mqtt = require('mqtt');
//const mqttClient = mqtt.connect('ws://localhost:8083/mqtt', { username: $USERNAME, password: $PASSWORD });
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
const InTopic = 'Topic_In';
const Command = 'Topic_Querry';

mqttClient.on('connect', function () {
    console.log('Server connected to Mqtt broker' );
    mqttClient.subscribe(InTopic);
});

// On receiving message from any client
mqttClient.on('message', function (topic, message) {
    console.log('Received Data from client: -', message.toString());
});
