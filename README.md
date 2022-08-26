To run the code: node Main.js in your cmd or powershell.

# Mini_Connector_Project

For this model of a mini connector, I used Mqtt as a communication protocol.
As for the funtion of the main code, it asks the user to input as many devices as he wants with the characteristics of each devices.
Then these devices are saved into an array of Objects.

Each device is caracterized with the following characteristics:

Device_ID: ID of the device, each time a device is created the ID is added by default (Index of the device)

Device_Type: The device can be either active or passive

Data_ID: Unique_ID of the Device to be identified from the server's side

Device_State: State of device, it can be On or Off

Time_Stamp: Time where the data is sent or recorded to be sent.

Data: Data to be sent, in this example we send Random Data for testing

Next is a loop to see the device's type and its state, if the type is 'passive', and the state is 'on' it will start sending Data to the server and then displaying it into the command line.

As for the active devices, an action is needed to output the data once. I am still improving the code to interact with the user and give the liberty to the latter to command the devices so this last part is still in progress.


