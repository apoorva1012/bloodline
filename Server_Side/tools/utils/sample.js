'use strict';

const Util = require('./util.js');
const hfc = require('hfc');

class Sample {

    constructor(usersToSecurityContext) {
        this.usersToSecurityContext = usersToSecurityContext;
        this.chain = hfc.getChain('myChain'); //TODO: Make this a config param?
    }

    create(userId) {
        let securityContext = this.usersToSecurityContext[userId];
        let V5CID = Sample.newV5CID();

        return this.doesV5CIDExist(userId, V5CID)
        .then(function() {
            return Util.invokeChaincode(securityContext, 'create_sample', [ V5CID ])
            .then(function() {
                return V5CID;
            });
        });
    }

    transfer(userId, buyer, functionName, V5CID) {
        return this.updateAttribute(userId, functionName , buyer, V5CID);
    }

    updateAttribute(userId, functionName, value, V5CID) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.invokeChaincode(securityContext, functionName, [ value, V5CID ]);
    }

    doesV5CIDExist(userId, V5CID) {
        let securityContext = this.usersToSecurityContext[userId];
        return Util.queryChaincode(securityContext, 'check_unique_v5c', [ V5CID ]);
    }

    static newV5CID() {
        let numbers = '1234567890';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let V5CID = '';
        for(let i = 0; i < 7; i++)
            {
            V5CID += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        V5CID = characters.charAt(Math.floor(Math.random() * characters.length)) + V5CID;
        V5CID = characters.charAt(Math.floor(Math.random() * characters.length)) + V5CID;
        return V5CID;
    }
}

module.exports = Sample;
