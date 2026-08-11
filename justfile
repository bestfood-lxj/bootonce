#!/usr/bin/env just --justfile
#https://github.com/casey/just
set dotenv-load
set dotenv-filename := ".env.local"
bash := env_var('RUNBASH')
@default:
  just --list
commit:
  {{bash}} ./commit.sh

