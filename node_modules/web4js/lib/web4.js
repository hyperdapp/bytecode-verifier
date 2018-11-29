/*!
 * web4.js - Theos & Hyperdapp JavaScript API
 *
 * @license lgpl-3.0 and MIT (as may find precedence)
 * @see https://github.com/ethereum/web4.js
*/

/*
 * This file is part of web4.js.
 *
 * web4.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * web4.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with web4.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @file web4.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./web4/requestmanager');
var Iban = require('./web4/iban');
var Eth = require('./web4/methods/eth');
var Tim = require('./web4/methods/tim');
var DB = require('./web4/methods/db');
var Shh = require('./web4/methods/shh');
var Net = require('./web4/methods/net');
var Personal = require('./web4/methods/personal');
var Swarm = require('./web4/methods/swarm');
var Debug = require('./web4/methods/debug');
var Settings = require('./web4/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./web4/extend');
var Batch = require('./web4/batch');
var Property = require('./web4/property');
var HttpProvider = require('./web4/httpprovider');
var IpcProvider = require('./web4/ipcprovider');
var BigNumber = require('bignumber.js');



function web4 (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.eth = new Eth(this);
    this.tim = new Tim(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.debug = new Debug(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
web4.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

web4.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

web4.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

web4.prototype.BigNumber = BigNumber;
web4.prototype.toHex = utils.toHex;
web4.prototype.toAscii = utils.toAscii;
web4.prototype.toUtf8 = utils.toUtf8;
web4.prototype.fromAscii = utils.fromAscii;
web4.prototype.fromUtf8 = utils.fromUtf8;
web4.prototype.toDecimal = utils.toDecimal;
web4.prototype.fromDecimal = utils.fromDecimal;
web4.prototype.toBigNumber = utils.toBigNumber;
web4.prototype.toWei = utils.toWei;
web4.prototype.fromWei = utils.fromWei;
web4.prototype.isAddress = utils.isAddress;
web4.prototype.isChecksumAddress = utils.isChecksumAddress;
web4.prototype.toChecksumAddress = utils.toChecksumAddress;
web4.prototype.isIBAN = utils.isIBAN;
web4.prototype.padLeft = utils.padLeft;
web4.prototype.padRight = utils.padRight;


web4.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
web4.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'web4_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.ethereum',
            getter: 'tim_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

web4.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

web4.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = web4;
