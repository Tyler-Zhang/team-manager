#!/bin/bash
mocha --recursive -r ts-node/register "src/**/*.spec.ts"
