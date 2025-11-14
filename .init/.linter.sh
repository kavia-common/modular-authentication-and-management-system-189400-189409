#!/bin/bash
cd /home/kavia/workspace/code-generation/modular-authentication-and-management-system-189400-189409/frontend_react_spa
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

