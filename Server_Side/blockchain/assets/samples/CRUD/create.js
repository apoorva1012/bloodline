'use strict';
let tracing = require(__dirname+'/../../../../tools/traces/trace.js');
let map_ID = require(__dirname+'/../../../../tools/map_ID/map_ID.js');
let Util = require(__dirname+'/../../../../tools/utils/util');
let Sample = require(__dirname+'/../../../../tools/utils/sample');

function create (req, res, next, usersToSecurityContext) {
    let user_id;

    if(typeof req.cookies.user !== 'undefined')
    {
        req.session.user = req.cookies.user;
        req.session.identity = map_ID.user_to_id(req.cookies.user);
    }
    user_id = req.session.identity;

    let vehicleData = new Sample(usersToSecurityContext);

    return vehicleData.create(user_id)
    .then(function(V5CID) {
        tracing.create('INFO', 'POST blockchain/assets/samples', 'Created sample');
        let result = {};
        result.message = 'Creation Confirmed';
        result.V5CID = V5CID;
        res.end(JSON.stringify(result));
    })
    .catch(function(err) {
        tracing.create('ERROR', 'POST blockchain/assets/samples', err.stack);
        res.send(JSON.stringify({'message':err.stack}));
    });
}

exports.create = create;
