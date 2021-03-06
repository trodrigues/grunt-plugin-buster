/*
 * Copyright 2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jshint node:true*/
'use strict';

var childProcess = require('child_process');


function ChildFactory(log) {
	this._log = log;
}

ChildFactory.prototype.create = function(executable, args) {
	var child = childProcess.spawn(executable, args, {
		env: process.env,
		setsid: true
	});

	child.stdout.on('data', function(data) {
		this._log.write(data.toString());
	}.bind(this));

	child.stderr.on('data', function (data) {
		this._log.error(data.toString());
	}.bind(this));

	return child;
};

module.exports = ChildFactory;
