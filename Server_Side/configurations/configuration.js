'use strict';

let fs = require('fs');

//TODO: Change this a be compatible with the Config npm module

let config = {};

//--------------------------------------------------------------------------------------------------------------------
//    Local Config
//--------------------------------------------------------------------------------------------------------------------
config.networkProtocol = 'http';                 // If deploying locally, this value needs to be changed to 'http'
config.appProtocol = 'http';                     // If deploying locally, this value needs to be changed to 'http'
config.hfcProtocol = 'grpc';                    // If deploying locally, this value needs to be changed to 'grpc'

//--------------------------------------------------------------------------------------------------------------------
//    Tracing
//--------------------------------------------------------------------------------------------------------------------

config.trace        = true;
config.traceFile    = __dirname+'/../logs/app_trace.log';     // File where traces should be written to


//Settings for the nodeJS application server
config.offlineUrl = 'localhost';
config.appPort = (process.env.VCAP_APP_PORT) ? process.env.VCAP_APP_PORT : 8080;                         //Port that the NodeJS server is operating on


//--------------------------------------------------------------------------------------------------------------------
//    User information - These credentials are used for HFC to enroll this user and then set them as the registrar to create new users.
//--------------------------------------------------------------------------------------------------------------------
config.registrar_name = 'WebAppAdmin';
config.registrar_password = 'DJY27pEnl16d';

//--------------------------------------------------------------------------------------------------------------------
//    HFC configuration - Defines what protocol to use for communication, bluemix certificate location and key store location
//--------------------------------------------------------------------------------------------------------------------

//Protocol used by HFC to communicate with blockchain peers and CA, need to change this manually.
config.certificate_file_name    = 'certificate.pem';
config.key_store_location       = './keyValStore';

//--------------------------------------------------------------------------------------------------------------------
//    Chaincode
//--------------------------------------------------------------------------------------------------------------------
//Chaincode file location
config.sample = 'github.com/hyperledger/fabric/code';

config.users = [
    {
        enrollmentID: 'BA',
        attributes: [
            {name: 'role', value: 'regulator'},
            {name: 'username', value: 'BA'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'BCamp1',
        attributes: [
            {name: 'role', value: 'camp'},
            {name: 'username', value: 'BCamp1'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'BCamp2',
        attributes: [
            {name: 'role', value: 'camp'},
            {name: 'username', value: 'BCamp2'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'BCamp3',
        attributes: [
            {name: 'role', value: 'camp'},
            {name: 'username', value: 'BCamp3'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Test1',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'Test1'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Test2',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'Test2'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Test3',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'Test3'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Red_Cross',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'Red_Cross'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'AmericanBlood',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'AmericanBlood'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'San_Jose_Blood_Bank',
        attributes: [
            {name: 'role', value: 'private'},
            {name: 'username', value: 'San_Jose_Blood_Bank'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Separation1',
        attributes: [
            {name: 'role', value: 'separation'},
            {name: 'username', value: 'Separation1'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Separation2',
        attributes: [
            {name: 'role', value: 'separation'},
            {name: 'username', value: 'Separation2'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Separation3',
        attributes: [
            {name: 'role', value: 'separation'},
            {name: 'username', value: 'Separation3'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },

    {
        enrollmentID: 'Hospital1',
        attributes: [
            {name: 'role', value: 'hospital'},
            {name: 'username', value: 'Hospital1'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Hospital2',
        attributes: [
            {name: 'role', value: 'hospital'},
            {name: 'username', value: 'Hospital2'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    },
    {
        enrollmentID: 'Hospital3',
        attributes: [
            {name: 'role', value: 'hospital'},
            {name: 'username', value: 'Hospital3'}
        ],
        registrar: {},
        roles: [],
        affiliation: 'institution_a'
    }
];

//--------------------------------------------------------------------------------------------------------------------
//    Defines the exported values to be used by other fields for connecting to peers or the app. These will be overwritten on app.js being run if Bluemix is being used or Network JSON is defined
//--------------------------------------------------------------------------------------------------------------------
//IP and port configuration
// config.api_ip = config.peers[0].discovery_host; //IP of the peer attempting to be connected to. By default this is the first peer in the peers array.
let credentials;

if (process.env.VCAP_SERVICES) {
    credentials = JSON.parse(process.env.VCAP_SERVICES)['ibm-blockchain-5-prod'][0].credentials;
} else {
    credentials = fs.readFileSync(__dirname + '/../../credentials.json', 'utf8');
    credentials = JSON.parse(credentials);
}

//When using blockchain on bluemix, api_port_external and api_port_internal will be the same
config.api_port_external  = credentials.peers[0].api_port; //port number used when calling api from outside of the vagrant environment
config.api_port_internal  = credentials.peers[0].discovery_port; //port number used when calling api from inside vagrant environment - generally used for chaincode calling out to api
config.api_port_discovery = credentials.peers[0].discovery_port; //port number used for HFC

config.api_ip = credentials.peers[0].discovery_host;

let ca;
for(let key in credentials.ca) {
    ca = credentials.ca[key];
}

//IP and port configuration for the Certificate Authority. This is used for enrolling WebAppAdmin and creating all the user via HFC. Default values are for running Hyperledger locally.
config.ca_ip = ca.discovery_host;     //IP of the CA attempting to be connected to
config.ca_port = ca.discovery_port;         //Discovery port of the Certificate Authority. Used for HFC

if (credentials.users) {
    credentials.users.forEach(function(user) {
        if (user.username === config.registrar_name) {
            config.bluemix_registrar_password = user.secret;
        }
    });
}

exports.config = config; // Exports for use in other files that require this one
