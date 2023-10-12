 /*eslint-disable*/
// import React, { Component } from 'react';

// class USBDeviceDetection extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cardNumber: null, // Initialize cardNumber to null
//     };
//   }

//   requestUSBDevice = async () => {
//     try {
//       const device = await navigator.usb.requestDevice({ filters: [] });
//       console.log('USB Device:', device);
//       await device.open();
//       await device.selectConfiguration(1); // Select the appropriate configuration
//       // Claim an interface
//       await device.claimInterface(0);

//       // Assuming you want to send a command and receive a response when a device is connected.
//       const response = await this.sendCommandToDevice(device, 'insert');
//       this.setState({ cardNumber: response });
//     } catch (error) {
//       console.error('Error requesting USB device:', error);
//     }
//   };

//   async sendCommandToDevice(device, command) {
//     try {
//       // Send the command to the USB device
//       const result = await device.transferOut(1, new TextEncoder().encode(command));
  
//       // Receive data from the USB device
//       const response = await device.transferIn(2, 64); // Adjust endpoint and buffer size as needed
//       const responseData = new TextDecoder().decode(response.data.buffer);
      
//       console.log('USB Device:', responseData);
      
//       return responseData;
//     } catch (error) {
//       console.error('Error communicating with USB device:', error);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>USB Device Detection</h1>
//         <button type="button" onClick={this.requestUSBDevice}>Request USB Device</button>
//         {/* Display detected devices here */}
//       </div>
//     );
//   }
// }

// export default USBDeviceDetection;



// // /*eslint-disable*/
// // import React, { Component } from 'react';

// // class USBDeviceDetection extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       cardNumber: null, // Initialize cardNumber to null
// //     };
// //   }

// //   requestUSBDevice = async () => {
// //     console.log("Connected USB devices:", navigator.usb.getDevices());

// //     navigator.usb.requestDevice({ filters: [] })
// //     .then(device => {
// //       // You now have access to the selected USB device
  
// //       // Open the device
// //       return device.open()
// //         .then(() => {
// //           // Claim the desired interface
// //           return device.claimInterface(0); // Replace with your specific interface number if it's not 0
// //         })
// //         .then(() => {
// //           // Device is now open and interface is claimed, ready for communication
  
// //           // Perform data transfer here, e.g., using device.transferIn() or device.transferOut()
  
// //           // When done, close the device
// //           return device.close();
// //         })
// //         .catch(error => {
// //           console.error("Error claiming interface:", error);
// //         });
// //     })
// //     .catch(error => {
// //       console.error("Error requesting device:", error);
// //     });
  
// //   };

// //   async sendCommandToDevice(device, command) {
// //     try {
// //       // Send the command to the USB device
// //       const result = await device.transferOut(1, new TextEncoder().encode(command));
  
// //       // Receive data from the USB device
// //       const response = await device.transferIn(2, 64); // Adjust endpoint and buffer size as needed
// //       const responseData = new TextDecoder().decode(response.data.buffer);
      
// //       console.log('USB Device:', responseData);
      
// //       return responseData;
// //     } catch (error) {
// //       console.error('Error communicating with USB device:', error);
// //     }
// //   }

// //   render() {
// //     return (
// //       <div>
// //         <h1>USB Device Detection</h1>
// //         <button type="button" onClick={this.requestUSBDevice}>Request USB Device</button>
// //         <p>Card Number: {this.state.cardNumber}</p>
// //         {/* Display detected devices here */}
// //       </div>
// //     );
// //   }
// // }

// // export default USBDeviceDetection;


/*eslint-disable*/

import React, { useState } from 'react'

const USBDeviceDetection = () => {

  const [device, setDevice] = useState(null);

  async function requestUSBDevice() {
    try {
      const usbDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 65535 }] });

      // Store the device in state for later use
      setDevice(usbDevice);

      // Continue with device initialization and data reading
      initializeDevice(usbDevice);
    } catch (error) {
      console.error('Error requesting USB device:', error);
    }
  }

  async function initializeDevice(usbDevice) {
    try {
      // Perform device initialization here, like claiming interfaces and starting communication with the RFID reader

      // Example: Claim an interface
      await usbDevice.open();
      await usbDevice.selectConfiguration(1);
      await usbDevice.claimInterface(1);
      console.log(device);

      // Example: Send a command to start reading RFID cards
      const scanCommand = new Uint8Array([0xAA, 0xBB, 0xCC]);
      await usbDevice.transferOut(1, scanCommand);

      // Example: Receive data from the RFID reader
      const response = await usbDevice.transferIn(1, 64);

      // Process and display the RFID card data
      console.log('RFID Card Data:', response.data);
    } catch (error) {
      console.error('Error initializing USB device:', error);
    }
  }

  return (
    <div>
      <button onClick={requestUSBDevice}>Request USB Device</button>
      {/* Component JSX */}
    </div>
  );
}

export default USBDeviceDetection






